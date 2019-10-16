import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const  routes:  Routes  = [
    {
        path: '',
        component: DashboardComponent,
        data: {title: 'Dashboard'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  DashboardRoutingModule { }
