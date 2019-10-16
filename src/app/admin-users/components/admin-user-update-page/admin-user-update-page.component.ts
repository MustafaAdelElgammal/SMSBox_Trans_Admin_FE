import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AdminUsersService, IReqUpdateAdminUser } from "../../services/adminUser.service";
import { IAdminUserOne } from "../../models/IAdminUser";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IAdminUserRole } from "../../models/IAdminUserRole";
import { RolesService } from "../../services/roles.service";
import { AppValidators } from "shared/AppValidators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-admin-user-update-page',
  templateUrl: './admin-user-update-page.component.html'
})
export class AdminUserUpdatePageComponent implements OnInit {

  private _id: string;
  public currentUser: IAdminUserOne;
  public roles: IAdminUserRole[] = null;
  public adminUserForm: FormGroup;
  public isSubmitClick = false;
  public successMessage = null;
  public emailUniqueError = null;
  public errorMessage = '';
  public controls: FormControl[] = [];

  constructor(private adminUsersService: AdminUsersService,
    private roleService: RolesService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {

    this._id = this.route.snapshot.params['id'];
    this.adminUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'active': new FormControl(false),
      'roles': new FormArray([], [AppValidators.minSelectedCheckboxes(1)])
    });

    this.getAdminUserById();

  }

  getAdminUserById() {
    this.adminUsersService.getAdminUserById(this._id).subscribe(
      (adminUser: IAdminUserOne) => {
        this.currentUser = adminUser;
        this.adminUserForm.get('name').setValue(this.currentUser.name);
        this.roleService.getAdminRoles().subscribe(
          (res) => {
            this.roles = res;
            this.adminUserForm.get('active').setValue(this.currentUser.active);
            this.roles.forEach(r => {
              const isChecked = this.currentUser.roles.findIndex(a => a === r._id) !== -1;
              (<FormArray>this.adminUserForm.get('roles')).push(new FormControl(isChecked));
              return new FormControl(isChecked);
            });
          },
          (error) => { }
        );

      },
      error => {}
    );
  }

  onSubmit() {

    this.errorMessage = '';
    this.emailUniqueError = null;

    if (!this.adminUserForm.valid) {
      return;
    }

    this.isSubmitClick = true;
    this.adminUserForm.value.roles = this.adminUserForm.value.roles
      .map((v, i) => v ? this.roles[i]._id : null)
      .filter(v => v !== null);

    const reqUpdateAdminUser = <IReqUpdateAdminUser>this.adminUserForm.value;
    reqUpdateAdminUser.adminUserId = this.currentUser._id;

    this.adminUsersService.updateAdminUser(reqUpdateAdminUser).subscribe(
      (res) => {
        this.toastr.success(`${reqUpdateAdminUser.name} user has been updated successfully`, 'Done');
        this.successMessage = `${reqUpdateAdminUser.name} user has been updated successfully`;
        this.isSubmitClick = false;
      },
      error => {
        this.isSubmitClick = false;
        if (error.status === 409) {
          this.emailUniqueError = error.error;
          this.toastr.error(error.error, 'Error');
        } else {
          this.errorMessage = error.error;
          this.toastr.error(error.error.message, 'Error');

        }
      }
    );
  }
}
