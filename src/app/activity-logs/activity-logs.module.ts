import { NgModule } from '@angular/core';
import {ActivityLogPageComponent} from "./components/activity-log-page/activity-log-page.component";
import {SharedModule} from "shared/shared.module";
import {ActivityLogsRoutingModule} from "./activity-logs-routing.module";
import { ActivityLogDetailsComponent } from './components/activity-log-details/activity-log-details.component';

@NgModule({
    declarations: [
        ActivityLogPageComponent,
        ActivityLogDetailsComponent
    ],
    imports: [
        SharedModule,
        ActivityLogsRoutingModule
    ]
})
export class ActivityLogsModule { }
