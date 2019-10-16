import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminUsersService, IReqCreateAdminUser } from "../../services/adminUser.service";
import { RolesService } from "../../services/roles.service";
import { IAdminUserRole } from "../../models/IAdminUserRole";
import { AppValidators } from "shared/AppValidators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-admin-user-create-page',
  templateUrl: './admin-user-create-page.component.html'
})

export class AdminUserCreatePageComponent implements OnInit {

  public emailUniqueError = null;
  public isSubmitClick: boolean;
  public adminUserForm: FormGroup;
  public errorMessage = '';
  public roles: IAdminUserRole[] = null;

  constructor(private adminUsersService: AdminUsersService,
    private roleService: RolesService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.adminUserForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, AppValidators.EmailValidator]),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'roles': new FormArray([], [AppValidators.minSelectedCheckboxes(1)]),
    });
    this.roleService.getAdminRoles().subscribe(
      (res) => {
        this.roles = res;
        this.roles.forEach((role, index) => {
          (<FormArray>this.adminUserForm.get('roles')).push(new FormControl(false));
        });
      },
      (error) => { }
    );
  }

  onSubmit() {

    this.errorMessage = '';
    this.emailUniqueError = null;

    if (!this.adminUserForm.valid) {
      this.errorMessage = 'true';
      return;
    }

    this.isSubmitClick = true;
    this.adminUserForm.value.roles = this.adminUserForm.value.roles
      .map((v, i) => v ? this.roles[i]._id : null)
      .filter(v => v !== null);

    const reqCreateAdminUser = <IReqCreateAdminUser>this.adminUserForm.value;

    this.adminUsersService.createAdminUser(reqCreateAdminUser).subscribe(
      () => {
        this.router.navigate(['/admin/admin_users/list']).then(() => {
          this.toastr.success(`Admin User has been created successfully`, 'Done');
        }).catch();
      },
      error => {
        if (error.status === 409) {
          this.emailUniqueError = error.error;
          this.toastr.error(error.error, 'Error');
        } else {
          this.errorMessage = error.error;
          this.toastr.error(error.error.message, 'Error');
        }
        this.isSubmitClick = false;
      }
    );
  }

  onReset() {
    this.adminUserForm.reset();
  }

}
