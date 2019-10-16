import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ActivityLogPageComponent} from "./components/activity-log-page/activity-log-page.component";
import {ActivityLogDetailsComponent} from "./components/activity-log-details/activity-log-details.component";

const  routes:  Routes  = [
    {
        path: '',
        component: ActivityLogPageComponent,
        data: {title: 'Activity Logs'}
    },
    {
      path: 'details/:id',
      component: ActivityLogDetailsComponent,
      data: {title: 'Activity Log Details'}
  }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  ActivityLogsRoutingModule { }
