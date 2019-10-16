import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/auth.service";

@Injectable()
export class AuthGuestService implements CanActivate {

    constructor(private auth: AuthenticationService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAuthenticated()) {
            this.router.navigate([route.queryParams['return'] || '/admin/dashboard']).then().catch();
            return false;
        }
        return true;
    }
}

