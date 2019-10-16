import { NgModule } from '@angular/core';
import {LogPageComponent} from "./components/log-page/log-page.component";
import {SharedModule} from "shared/shared.module";
import {LogsRoutingModule} from "./logs-routing.module";
import {LogDetailsComponent} from "./components/log-details/log-details.component";

@NgModule({
  declarations: [
      LogPageComponent,
      LogDetailsComponent
  ],
  imports: [
      SharedModule,
      LogsRoutingModule
  ]
})
export class LogsModule { }
