import { NgModule } from '@angular/core';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { SharedModule } from 'shared/shared.module';
import { NotificationsDashboardComponent } from './components/notifications-dashboard/notifications-dashboard.component';
import { EmailAccountsListComponent } from './components/email-accounts-list/email-accounts-list.component';
import { EmailAccountsCreateComponent } from './components/email-accounts-create/email-accounts-create.component';
import { EmailAccountsUpdateComponent } from './components/email-accounts-update/email-accounts-update.component';
import { SmsAccountsListComponent } from './components/sms-accounts-list/sms-accounts-list.component';
import { SmsAccountsCreateComponent } from './components/sms-accounts-create/sms-accounts-create.component';
import { SmsAccountsUpdateComponent } from './components/sms-accounts-update/sms-accounts-update.component';

@NgModule({
  declarations: [
    NotificationsDashboardComponent,
    EmailAccountsListComponent,
    EmailAccountsCreateComponent,
    EmailAccountsUpdateComponent,
    SmsAccountsListComponent,
    SmsAccountsCreateComponent,
    SmsAccountsUpdateComponent
  ],
  imports: [
    SharedModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
