import { Component, OnInit } from '@angular/core';
import { SMSAccountsService } from 'app/notifications/services/sms-accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IReqUpdateSMSAccount } from 'app/notifications/models/sms-accounts/sms-accounts-request';
import { IResGetSMSAccount } from 'app/notifications/models/sms-accounts/sms-accounts-response';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sms-accounts-update',
  templateUrl: './sms-accounts-update.component.html'
})
export class SmsAccountsUpdateComponent implements OnInit {

  private _id: string;
  public currentSMSAccount: IResGetSMSAccount;
  public smsAccountForm: FormGroup;
  public isSubmitClick = false;
  public successMessage = null;
  public errorMessage = '';

  constructor(
    private smsAccountsService: SMSAccountsService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.smsAccountForm = new FormGroup({
      'provider': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'account_sid': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'auth_token': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      'customerId': new FormControl()
    });

        this.getSMSAccountById();
  }

  getSMSAccountById() {
    this.smsAccountsService.getSMSAccountById(this._id).subscribe(
        (smsAccount: IResGetSMSAccount) => {
            this.currentSMSAccount = smsAccount;
            this.smsAccountForm.get('provider').setValue(this.currentSMSAccount.provider);
            this.smsAccountForm.get('name').setValue(this.currentSMSAccount.name);
            this.smsAccountForm.get('account_sid').setValue(this.currentSMSAccount.account_sid);
            this.smsAccountForm.get('auth_token').setValue(this.currentSMSAccount.auth_token);
            this.smsAccountForm.get('customerId').setValue(this.currentSMSAccount.customerId);
        },
      () => {
        }
    );
}

onSubmit() {

    this.errorMessage = '';

    if(!this.smsAccountForm.valid) {
        this.errorMessage = 'Please insert valid data';
        return;
    }

    this.isSubmitClick = true;
    this.smsAccountForm.value.customerId = +this.smsAccountForm.value.customerId;

    const reqUpdateSMSAccount = <IReqUpdateSMSAccount> this.smsAccountForm.value;
    reqUpdateSMSAccount.smsAccountId = this.currentSMSAccount._id;

    this.smsAccountsService.updateSMSAccount(reqUpdateSMSAccount).subscribe(
        () => {
          this.toastr.success(`SMS Account has been updated successfully`, 'Done');
          this.isSubmitClick = false;
        },
        error => {
            this.isSubmitClick = false;
            this.errorMessage = error.error;
            this.toastr.error(error.error, 'Error');
        }
    );
}

}


