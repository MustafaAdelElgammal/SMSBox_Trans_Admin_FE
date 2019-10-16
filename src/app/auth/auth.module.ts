import {NgModule} from '@angular/core';
import {AuthRoutingModule} from "./auth-routing.module";
import {ForgotComponent} from "./components/forgot/forgot.component";
import {LoginComponent} from "./components/login/login.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        ForgotComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
