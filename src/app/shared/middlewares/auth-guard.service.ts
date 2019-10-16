import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/auth.service";
import {LocalStoreManager} from "shared/services/local-store-manager.service";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

    constructor(private localStoreManager:LocalStoreManager,
                private auth: AuthenticationService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/admin/auth/login'], {
                queryParams: {return: state.url}
            }).then().catch();
            return false;
        }
        return true;
    }

}

