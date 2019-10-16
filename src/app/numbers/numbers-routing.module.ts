import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortedNumbersComponent} from "./components/ported-numbers/ported-numbers.component";
import {BlacklistedNumbersComponent} from "./components/blacklisted-numbers/blacklisted-numbers.component";
import {PortedNumbersCreateComponent} from "./components/ported-numbers-create/ported-numbers-create.component";
import {BlacklistedNumbersCreateComponent} from "./components/blacklisted-numbers-create/blacklisted-numbers-create.component";
import {NumbersDashboardComponent} from "./components/numbers-dashboard/numbers-dashboard.component";

const  routes:  Routes  = [
    {
        path: 'dashboard',
        component: NumbersDashboardComponent,
        data: {title: 'Numbers | Dashboard'}
    },{
        path: 'ported-numbers/list',
        component: PortedNumbersComponent,
        data: {title: 'Ported Numbers | List'}
    },
    {
        path: 'ported-numbers/create',
        component: PortedNumbersCreateComponent,
        data: {title: 'Ported Numbers | Create'}
    },
    {
        path: 'black-numbers/list',
        component: BlacklistedNumbersComponent,
        data: {title: 'Black List Numbers | List'}
    },
    {
        path: 'black-numbers/create',
        component: BlacklistedNumbersCreateComponent,
        data: {title: 'Black List Numbers | Create'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  NumbersRoutingModule { }
