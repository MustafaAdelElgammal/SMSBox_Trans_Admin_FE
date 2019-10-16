import { NgModule } from '@angular/core';
import {SharedModule} from "shared/shared.module";
import {NumbersRoutingModule} from "./numbers-routing.module";
import {PortedNumbersComponent} from "./components/ported-numbers/ported-numbers.component";
import {BlacklistedNumbersComponent} from "./components/blacklisted-numbers/blacklisted-numbers.component";
import { PortedNumbersCreateComponent } from './components/ported-numbers-create/ported-numbers-create.component';
import { BlacklistedNumbersCreateComponent } from './components/blacklisted-numbers-create/blacklisted-numbers-create.component';
import { NumbersDashboardComponent } from './components/numbers-dashboard/numbers-dashboard.component';

@NgModule({
    declarations: [
        PortedNumbersComponent,
        BlacklistedNumbersComponent,
        PortedNumbersCreateComponent,
        BlacklistedNumbersCreateComponent,
        NumbersDashboardComponent
    ],
    imports: [
        SharedModule,
        NumbersRoutingModule
    ]
})
export class NumbersModule { }
