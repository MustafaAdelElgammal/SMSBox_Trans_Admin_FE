import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ForgotComponent} from "./components/forgot/forgot.component";

const  routes:  Routes  = [
    {
        path: 'login',
        component: LoginComponent,
        data: {title: 'Admin LogIn'}
    },
    {
        path: 'forgot',
        component: ForgotComponent,
        data: {title: 'Admin Forgot'}
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export  class  AuthRoutingModule { }
