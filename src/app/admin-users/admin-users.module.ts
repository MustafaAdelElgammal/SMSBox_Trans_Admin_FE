import {NgModule} from '@angular/core';
import {AdminUserListPageComponent} from "./components/admin-user-list-page/admin-user-list-page.component";
import {AdminUserUpdatePageComponent} from "./components/admin-user-update-page/admin-user-update-page.component";
import {AdminUserUpdatePasswordPageComponent} from "./components/admin-user-update-password-page/admin-user-update-password-page.component";
import {AdminUserCreatePageComponent} from "./components/admin-user-create-page/admin-user-create-page.component";
import {AdminUserDashboardComponent} from "./components/admin-user-dashboard/admin-user-dashboard.component";
import {SharedModule} from "shared/shared.module";
import {AdminUsersRoutingModule} from "./admin-users-routing.module";
import {AdminUserFilterFormComponent} from "./components/admin-user-filter-form/admin-user-filter-form.component";
import {AdminUserDotsActionsComponent} from "./components/admin-user-dots-actions/admin-user-dots-actions.component";

@NgModule({
    declarations: [
        AdminUserFilterFormComponent,
        AdminUserListPageComponent,
        AdminUserUpdatePageComponent,
        AdminUserUpdatePasswordPageComponent,
        AdminUserCreatePageComponent,
        AdminUserDashboardComponent,
        AdminUserDotsActionsComponent
    ],
    imports: [
        SharedModule,
        AdminUsersRoutingModule
    ]
})
export class AdminUsersModule { }
