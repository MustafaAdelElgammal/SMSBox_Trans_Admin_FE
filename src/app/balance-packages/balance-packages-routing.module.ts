import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BalancePackagesDashboardComponent} from "./components/balance-packages-dashboard/balance-packages-dashboard.component";
import {BalancePackagesListPageComponent} from "./components/balance-packages-list-page/balance-packages-list-page.component";
import {BalancePackagesCreateComponent} from "./components/balance-packages-create/balance-packages-create.component";
import {BalancePackagesDetailsComponent} from "./components/balance-packages-details/balance-packages-details.component";

const  routes:  Routes  = [
    {
        path: 'dashboard',
        component: BalancePackagesDashboardComponent,
        data: {title: 'Balance Packages | Dashboard'}
    },
    {
        path: 'list',
        component: BalancePackagesListPageComponent,
        data: {title: 'Balance Packages | List'}
    },
    {
        path: 'create',
        component: BalancePackagesCreateComponent,
        data: {title: 'Balance Packages | Create'}
    },
    {
        path: 'details/:id',
        component: BalancePackagesDetailsComponent,
        data: {title: 'Balance Packages | Details'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  BalancePackagesRoutingModule { }
