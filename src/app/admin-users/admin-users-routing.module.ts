import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminUserDashboardComponent} from "./components/admin-user-dashboard/admin-user-dashboard.component";
import {AdminUserListPageComponent} from "./components/admin-user-list-page/admin-user-list-page.component";
import {AdminUserCreatePageComponent} from "./components/admin-user-create-page/admin-user-create-page.component";
import {AdminUserUpdatePageComponent} from "./components/admin-user-update-page/admin-user-update-page.component";
import {AdminUserUpdatePasswordPageComponent} from "./components/admin-user-update-password-page/admin-user-update-password-page.component";

const  routes:  Routes  = [
  {
      path: 'dashboard',
      component: AdminUserDashboardComponent,
      data: {title: 'Admin Users | Dashboard'}
  },
  {
      path: 'list',
      component: AdminUserListPageComponent,
      data: {title: 'Admin Users | List'}
  },
  {
      path: 'create',
      component: AdminUserCreatePageComponent,
      data: {title: 'Admin Users | Create'}
  },
  {
      path: 'details/:id',
      component: AdminUserUpdatePageComponent,
      data: {title: 'Admin Users | Details'}
  },
  {
      path: 'change_password/:id',
      component: AdminUserUpdatePasswordPageComponent,
      data: {title: 'Admin Users | Change Password'}
  }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  AdminUsersRoutingModule { }
