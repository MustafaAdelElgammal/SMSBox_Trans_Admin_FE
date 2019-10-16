import { IResGetEmailAccount } from '../../models/email-accounts/email-accounts-response';
import { IReqUpdateEmailAccount } from '../../models/email-accounts/email-accounts-request';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailAccountService } from '../../services/emailAccount.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-email-accounts-update',
  templateUrl: './email-accounts-update.component.html'
})
export class EmailAccountsUpdateComponent implements OnInit {
  private _id: string;
  public currentEmailAccount: IResGetEmailAccount;
  public updateEmailAccountForm: FormGroup;
  public submitted = false;
  public emailUniqueError = null;
  public errorMessage = '';
  public controls: FormControl[] = [];

  constructor(private emailAccountService: EmailAccountService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.updateEmailAccountForm = new FormGroup({
      'defaultName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'host': new FormControl(null, [Validators.required]),
      'port': new FormControl(null, [Validators.required]),
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'enableSSL': new FormControl(false),
    });

    this.getEmailAccountById();
  }

  getEmailAccountById() {
    this.emailAccountService.getEmailAccount(this._id).subscribe(
      (emailAccount: IResGetEmailAccount) => {
        this.currentEmailAccount = emailAccount;
        this.updateEmailAccountForm.get('defaultName').setValue(this.currentEmailAccount.defaultName);
        this.updateEmailAccountForm.get('email').setValue(this.currentEmailAccount.email);
        this.updateEmailAccountForm.get('host').setValue(this.currentEmailAccount.host);
        this.updateEmailAccountForm.get('port').setValue(this.currentEmailAccount.port);
        this.updateEmailAccountForm.get('username').setValue(this.currentEmailAccount.username);
        this.updateEmailAccountForm.get('password').setValue(this.currentEmailAccount.password);
        this.updateEmailAccountForm.get('enableSSL').setValue(this.currentEmailAccount.enableSSL);
      },
      error => {
        alert(error.error);
      }
    );
  }

  onSubmit() {

    this.errorMessage = '';
    this.emailUniqueError = null;

    if (!this.updateEmailAccountForm.valid) {
      this.errorMessage = 'Please insert valid data';
      return;
    }

    this.submitted = true;

    const reqUpdateEmailAccount = <IReqUpdateEmailAccount>this.updateEmailAccountForm.value;
    reqUpdateEmailAccount.id = this.currentEmailAccount._id;
    reqUpdateEmailAccount.port = +this.currentEmailAccount.port;

    this.emailAccountService.updateEmailAccount(reqUpdateEmailAccount).subscribe(
      () => {
        this.toastr.success(`Email Account has been updated successfully`, 'Done');
        this.submitted = false;
      },
      error => {
        this.submitted = false;
        if (error.status === 409) {
          this.emailUniqueError = error.error;
          this.toastr.error(error.error, 'Error');
        } else {
          this.errorMessage = 'true';
          this.toastr.error(error.error, 'Error');
        }
      }
    );
  }

}
