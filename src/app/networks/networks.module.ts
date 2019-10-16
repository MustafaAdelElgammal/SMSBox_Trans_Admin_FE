import {NgModule} from '@angular/core';
import {NetworksPageComponent} from "./components/networks-page/networks-page.component";
import {NetworksCreatePageComponent} from "./components/networks-create-page/networks-create-page.component";
import {NetworksDashboardPageComponent} from "./components/networks-dashboard-page/networks-dashboard-page.component";
import {NetworkDetailsPageComponent} from "./components/network-details-page/network-details-page.component";
import {SharedModule} from "shared/shared.module";
import {NetworksRoutingModule} from "./networks-routing.module";

@NgModule({
    declarations: [
        NetworksPageComponent,
        NetworksCreatePageComponent,
        NetworksDashboardPageComponent,
        NetworkDetailsPageComponent,
    ],
    imports: [
        SharedModule,
        NetworksRoutingModule
    ]
})
export class NetworksModule { }
