import { SmsAccountsListComponent } from './components/sms-accounts-list/sms-accounts-list.component';
import { EmailAccountsUpdateComponent } from './components/email-accounts-update/email-accounts-update.component';
import { EmailAccountsCreateComponent } from './components/email-accounts-create/email-accounts-create.component';
import { EmailAccountsListComponent } from './components/email-accounts-list/email-accounts-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsDashboardComponent } from './components/notifications-dashboard/notifications-dashboard.component';
import { SmsAccountsCreateComponent } from './components/sms-accounts-create/sms-accounts-create.component';
import { SmsAccountsUpdateComponent } from './components/sms-accounts-update/sms-accounts-update.component';

const routes: Routes = [
  {
      path: '',
      component: NotificationsDashboardComponent,
      data: {title: 'Notifications | Dashboard'}
  },
  {
      path: 'dashboard',
      component: NotificationsDashboardComponent,
      data: {title: 'Notifications | Dashboard'}
  },
  {
      path: 'email-accounts-list',
      component: EmailAccountsListComponent,
      data: {title: 'Notifications | Email Accounts List'}
  },
  {
      path: 'email-accounts-create',
      component: EmailAccountsCreateComponent,
      data: {title: 'Notifications | Email Accounts Create'}
  },
  {
      path: 'email-accounts-update/:id',
      component: EmailAccountsUpdateComponent,
      data: {title: 'Notifications | Email Accounts Details'}
  },
  {
      path: 'sms-accounts-list',
      component: SmsAccountsListComponent,
      data: {title: 'Notifications | SMS Accounts List'}
  },
  {
      path: 'sms-accounts-create',
      component: SmsAccountsCreateComponent,
      data: {title: 'Notifications | SMS Accounts Create'}
  },
  {
      path: 'sms-accounts-update/:id',
      component: SmsAccountsUpdateComponent,
      data: {title: 'Notifications | SMS Accounts Details'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
