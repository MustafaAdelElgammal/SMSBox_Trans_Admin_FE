import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SMSAccountsService } from 'app/notifications/services/sms-accounts.service';
import { Router } from '@angular/router';
import { IReqCreateSMSAccount } from 'app/notifications/models/sms-accounts/sms-accounts-request';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-sms-accounts-create',
  templateUrl: './sms-accounts-create.component.html'
})
export class SmsAccountsCreateComponent implements OnInit {

  public isSubmitClick: boolean;
  public createSMSAccountForm: FormGroup;
  public errorMessage = '';

  constructor(
    private smsAccountsService: SMSAccountsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.createSMSAccountForm = new FormGroup({
      'provider': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'account_sid': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'auth_token': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'customerId': new FormControl()
    });
  }

  onSubmit() {

    this.errorMessage = '';

    if (!this.createSMSAccountForm.valid) {
      this.errorMessage = 'true';
      return;
    }
    this.isSubmitClick = true;
    this.createSMSAccountForm.value.customerId = +this.createSMSAccountForm.value.customerId;

    const reqCreateSMSAccount = <IReqCreateSMSAccount>this.createSMSAccountForm.value;
    if (reqCreateSMSAccount.customerId === undefined) {
      reqCreateSMSAccount.customerId = 0;
    }
    this.smsAccountsService.createSMSAccount(reqCreateSMSAccount).subscribe(
      () => {
        this.router.navigate(['/admin/notifications/sms-accounts-list']).then(() => {
          this.toastr.success(`SMS Account has been created successfully`, 'Done');
        }).catch();
      },
      error => {
        this.isSubmitClick = false;
        this.errorMessage = error.error;
        this.toastr.error(error.error, 'Error');
      }
    );

  }

}
