import {NgModule} from '@angular/core';
import {ListPageComponent} from "./components/list-page/list-page.component";
import {AddPackageComponent} from "./components/add-package/add-package.component";
import {DashboardPageComponent} from "./components/dashboard-page/dashboard-page.component";
import {UserDotsActionsComponent} from "./components/user-dots-actions/user-dots-actions.component";
import {SharedModule} from "shared/shared.module";
import {UsersRoutingModule} from "./users-routing.module";

@NgModule({
    declarations: [
        ListPageComponent,
        AddPackageComponent,
        DashboardPageComponent,
        UserDotsActionsComponent,
    ],
    imports: [
        SharedModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
