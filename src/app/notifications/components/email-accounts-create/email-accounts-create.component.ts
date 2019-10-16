import { IReqAddEmailAccount } from '../../models/email-accounts/email-accounts-request';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailAccountService } from '../../services/emailAccount.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AppValidators} from "shared/AppValidators";

@Component({
  selector: 'app-email-accounts-create',
  templateUrl: './email-accounts-create.component.html'
})
export class EmailAccountsCreateComponent implements OnInit {

  public submitted: boolean;
  public createEmailAccountForm: FormGroup;
  public errorMessage = '';
  public successMessage = '';
  public emailUniqueError = null;
  public values: IReqAddEmailAccount = {
    defaultName: null,
    email: null,
    host: null,
    port: null,
    username: null,
    password: null,
    enableSSL: false,
  };
  constructor(
    private emailAccountService: EmailAccountService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.createEmailAccountForm = new FormGroup({
      'defaultName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'host': new FormControl(null, [Validators.required, AppValidators.validateHost]),
      'port': new FormControl(null, [Validators.required]),
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'enableSSL': new FormControl(false),
    });
  }


  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.emailUniqueError = null;

    if (!this.createEmailAccountForm.valid) {
      this.errorMessage = 'true';
      return;
    }
    this.submitted = true;

    this.prepareFormValues();
    this.emailAccountService.addEmailAccount(this.values).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['/admin/notifications/email-accounts-list']).then(() => {
          this.toastr.success(`Email Account has been created successfully`, 'Done');
        }).catch();
        this.createEmailAccountForm.reset();
      },
      error => {
        this.submitted = false;
        if (error.status === 409) {
          this.emailUniqueError = error.error;
          this.toastr.error(error.error, 'Error');
        } else {
            this.toastr.error(error.message, 'Error');
        }
      }
    );
  }

  prepareFormValues() {
    this.values.defaultName = this.createEmailAccountForm.controls.defaultName.value;
    this.values.email = this.createEmailAccountForm.controls.email.value;
    this.values.host = this.createEmailAccountForm.controls.host.value;
    this.values.port = +this.createEmailAccountForm.controls.port.value;
    this.values.username = this.createEmailAccountForm.controls.username.value;
    this.values.password = this.createEmailAccountForm.controls.password.value;
    this.values.enableSSL = !!this.createEmailAccountForm.controls.enableSSL.value;
  }

}
