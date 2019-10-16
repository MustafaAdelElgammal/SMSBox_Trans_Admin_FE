import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, IResUserLogin} from "shared/services/auth.service";
import {LocalStoreManager} from "shared/services/local-store-manager.service";

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthenticationService,
                private localStoreManager:LocalStoreManager,
                private route: ActivatedRoute,
                private router: Router) {}

    public errorMessage: string = null;
    public isLoginClick = false;
    public returnTo: string;

    ngOnInit() {
        this.route.queryParams.subscribe( (params) => {
            this.returnTo = params['return'] || '/admin/dashboard';
        });
    }
    signIn(value) {

        this.errorMessage = null;
        this.isLoginClick = true;

        this.authService.login(value).subscribe(
            (data: IResUserLogin) => {
                if(value['remember'] === true) {
                    localStorage.setItem('token', data.token);
                } else {
                    this.localStoreManager.saveSyncedSessionData(data.token, 'token');
                }
                localStorage.setItem('email', data.email);
                localStorage.setItem('remember', value['remember'] === true ? 'true' : ' false');
                this.authService.setIsLogin(true);
                this.router.navigate([this.returnTo]).then().catch();
            },
            error => {
                if(error.status === 401) {
                    this.errorMessage = 'Invalid Email or/and Password';
                } else {
                    this.errorMessage = 'Invalid Email or/and Password';
                }
                this.isLoginClick = false;
            }
        );
    }
}
