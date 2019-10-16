import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';

import {httpInterceptorProviders} from "shared/interceptors";
import {SharedModule} from "shared/shared.module";
import {CoreModule} from "./core/core.module";
import {AppComponent} from './core/components/app.component';
import {AdminComponent} from './core/components/admin/admin.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthenticationService} from "shared/services/auth.service";
import {AuthComponent} from "./core/components/auth/auth.component";
import {AuthGuestService} from "shared/middlewares/auth-guest.service";
import {AuthGuardService} from "shared/middlewares/auth-guard.service";

@NgModule({
    declarations: [

        AppComponent,
        AdminComponent,
        AuthComponent

    ],
    imports: [

        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-top-left',
            preventDuplicates: true,
            progressBar:true,
            closeButton:true,
            enableHtml:true
        }),
        SharedModule,
        CoreModule,
        AppRoutingModule

    ],
    providers: [

        httpInterceptorProviders,
        AuthenticationService,
        AuthGuestService,
        AuthGuardService,
        Title

    ],
    bootstrap: [

        AppComponent

    ]
})
export class AppModule { }
