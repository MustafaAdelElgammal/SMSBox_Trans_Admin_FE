import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogPageComponent} from "./components/log-page/log-page.component";
import {LogDetailsComponent} from "./components/log-details/log-details.component";

const  routes:  Routes  = [
    {
        path: '',
        component: LogPageComponent,
        data: {title: 'Logs | List'}
    },
    {
        path: 'details/:id',
        component: LogDetailsComponent,
        data: {title: 'Logs | Details'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  LogsRoutingModule { }
