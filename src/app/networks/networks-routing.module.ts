import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NetworksDashboardPageComponent} from "./components/networks-dashboard-page/networks-dashboard-page.component";
import {NetworksPageComponent} from "./components/networks-page/networks-page.component";
import {NetworksCreatePageComponent} from "./components/networks-create-page/networks-create-page.component";
import {NetworkDetailsPageComponent} from "./components/network-details-page/network-details-page.component";

const  routes:  Routes  = [
    {
        path: '',
        component: NetworksDashboardPageComponent,
        data: {title: 'Networks | Dashboard'}
    },
    {
        path: 'dashboard',
        component: NetworksDashboardPageComponent,
        data: {title: 'Networks | Dashboard'}
    },
    {
        path: 'list',
        component: NetworksPageComponent,
        data: {title: 'Networks | List'}
    },
    {
        path: 'create',
        component: NetworksCreatePageComponent,
        data: {title: 'Networks | Create'}
    },
    {
        path: 'details/:id',
        component: NetworkDetailsPageComponent,
        data: {title: 'Networks | Details'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  NetworksRoutingModule { }
