import { IResGetEmailAccount } from '../../models/email-accounts/email-accounts-response';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailAccountService } from '../../services/emailAccount.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-accounts-list',
  templateUrl: './email-accounts-list.component.html'
})
export class EmailAccountsListComponent implements OnInit {
  public displayLoader = 'block';
  public displayTable = 'none';
  public notFound = false;
  public emailAccounts = [];

  constructor(private emailAccountService: EmailAccountService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getEmailAccounts();
  }

  getEmailAccounts() {
    this.emailAccountService.getEmailAccounts().subscribe(
      (res: IResGetEmailAccount[]) => {
        this.emailAccounts = res;
        this.displayLoader = 'none';
        this.displayTable = 'table';
        this.notFound = res.length === 0;
      },
      () => {
        this.displayLoader = 'none';
        this.displayTable = 'table';
        this.notFound = true;
      }
    );
  }
}
