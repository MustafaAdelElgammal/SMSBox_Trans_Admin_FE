import {Validators, FormBuilder, FormArray, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminUsersService, IReqChangeAdminUserPassword } from '../../services/adminUser.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AppValidators} from "shared/AppValidators";
import {BaseCreateFormView} from "shared/abstracts/BaseCreateFormView";
import {IAdminUserOne} from "../../models/IAdminUser";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-admin-user-update-password-page',
    templateUrl: './admin-user-update-password-page.component.html'
})

export class AdminUserUpdatePasswordPageComponent extends BaseCreateFormView implements OnInit {
    private _id: string;
    public changePasswordForm: FormGroup;
    public isSubmitClick = false;
    public data: IReqChangeAdminUserPassword = {
        adminUserId: '',
        new_password: ''
    };
    public validationMessages = {
        'password': {
            'required': 'Password is required',
            'minlength': 'Password should be at least 6 characters'
        },
        'confirmPassword': {
            'required': 'Confirm Password is required',
            'MatchPassword': 'Password and confirm password does\'t match'
        }
    };
    public formErrors = {
        'password': '',
        'confirmPassword': ''
    };
    public currentUser: IAdminUserOne;

    constructor(private adminUsersService: AdminUsersService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private toastr: ToastrService) {super();}

    ngOnInit() {
        this._id = this.route.snapshot.params['id'];
        this.changePasswordForm = this.fb.group({
            'password': ['', [Validators.required, Validators.minLength(6)]],
            'confirmPassword': ['', [Validators.required]]
        }, {validator: AppValidators.MatchPassword});
        this.changePasswordForm.valueChanges.subscribe(() => {
            this.validationLogErrors(this.changePasswordForm);
        });
        this.getAdminUserById();
    }

    onSubmit() {

        if (!this.changePasswordForm.valid) {
            Object.keys(this.changePasswordForm.controls).forEach(field => {
                this.changePasswordForm.get(field).markAsTouched();
            });
            this.validationLogErrors(this.changePasswordForm);
            return;
        }

        this.isSubmitClick = true ;
        this.data.adminUserId = this._id;
        this.data.new_password = this.changePasswordForm.value.confirmPassword;

        this.adminUsersService.changeAdminUserPassword(this.data).subscribe(
            () => {
                this.isSubmitClick = false;
                this.router.navigate(["/admin/admin_users/details/" + this._id]).then(() => {
                    this.toastr.success(`Password Changed successfully`, 'Done');

                }).catch();
            },
            err => {
                this.isSubmitClick = false;
                this.toastr.error(err.error, 'Error');
            }
        );
    }
  getAdminUserById() {
      this.adminUsersService.getAdminUserById(this._id).subscribe(
          (adminUser: IAdminUserOne) => {
              this.currentUser = adminUser;
          },
          error => {}
      );
  }
}
