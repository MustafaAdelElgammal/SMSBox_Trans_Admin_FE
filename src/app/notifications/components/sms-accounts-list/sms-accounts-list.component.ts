import { Component, OnInit } from '@angular/core';
import { SMSAccountsService } from 'app/notifications/services/sms-accounts.service';
import { IResSMSAccount, IResGetSMSAccount } from 'app/notifications/models/sms-accounts/sms-accounts-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sms-accounts-list',
  templateUrl: './sms-accounts-list.component.html'
})
export class SmsAccountsListComponent implements OnInit {

  public displayLoader = 'block';
  public displayTable = 'none';
  public notFound = false;
  public smsAcounts = [];

  constructor(
    private smsAccountsService: SMSAccountsService,
    private route: ActivatedRoute,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.getSMSAccounts();
  }

  getSMSAccounts() {
    this.smsAccountsService.getAllSMSAccounts().subscribe(
      (res: IResSMSAccount[]) => {
        this.smsAcounts = res;
        this.displayLoader = 'none';
        this.displayTable = 'table';
        this.notFound = res.length <= 0;
      },
      () => {
        this.displayLoader = 'none';
        this.displayTable = 'table';
        this.notFound = true;
      }
    );
  }
}
