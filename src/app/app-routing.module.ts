import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './core/components/admin/admin.component';
import { AuthComponent } from "./core/components/auth/auth.component";
import { AuthGuestService } from "shared/middlewares/auth-guest.service";
import { AuthGuardService } from "shared/middlewares/auth-guard.service";


const routes: Routes = [

  {

    path: 'admin/auth',
    component: AuthComponent,
    canActivate: [AuthGuestService],
    loadChildren: './auth/auth.module#AuthModule'

  },
  {

    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        // Networks Routes
        path: 'networks',
        loadChildren: './networks/networks.module#NetworksModule'
      },
      {
        // balance_package Routes
        path: 'balance_packages',
        loadChildren: './balance-packages/balance-packages.module#BalancePackagesModule'
      },

      {
        // Users Routes
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        // Log Routes
        path: 'logs',
        loadChildren: './logs/logs.module#LogsModule'
      },
      {
        // Log Routes
        path: 'activity_logs',
        loadChildren: './activity-logs/activity-logs.module#ActivityLogsModule'
      },
      {
        // admin_users Routes
        path: 'admin_users',
        loadChildren: './admin-users/admin-users.module#AdminUsersModule'
      },
      {
        // Numbers Routes
        path: 'numbers',
        loadChildren: './numbers/numbers.module#NumbersModule'
      },
      {
        // notifications Routes
        path: 'notifications',
        loadChildren: './notifications/notifications.module#NotificationsModule'
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]

  },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
