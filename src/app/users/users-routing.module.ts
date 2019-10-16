import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardPageComponent} from "./components/dashboard-page/dashboard-page.component";
import {ListPageComponent} from "./components/list-page/list-page.component";
import {AddPackageComponent} from "./components/add-package/add-package.component";

const  routes:  Routes  = [
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        data: {title: 'Users | Dashboard'}
    },
    {
        path: 'list',
        component: ListPageComponent,
        data: {title: 'Users | List'}
    },
    {
        path: 'addPackage',
        component: AddPackageComponent,
        data: {title: 'Users | Add Package'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  UsersRoutingModule { }
