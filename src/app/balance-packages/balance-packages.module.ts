import { NgModule } from '@angular/core';
import {BalancePackagesListPageComponent} from "./components/balance-packages-list-page/balance-packages-list-page.component";
import {BalancePackagesCreateComponent} from "./components/balance-packages-create/balance-packages-create.component";
import {BalancePackagesDashboardComponent} from "./components/balance-packages-dashboard/balance-packages-dashboard.component";
import {BalancePackagesDetailsComponent} from "./components/balance-packages-details/balance-packages-details.component";
import {SharedModule} from "shared/shared.module";
import {BalancePackagesRoutingModule} from "./balance-packages-routing.module";

@NgModule({
    declarations: [
        BalancePackagesListPageComponent,
        BalancePackagesDashboardComponent,
        BalancePackagesCreateComponent,
        BalancePackagesDetailsComponent,
    ],
    imports: [
        SharedModule,
        BalancePackagesRoutingModule
    ]
})
export class BalancePackagesModule { }
