import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {LocalStoreManager} from "shared/services/local-store-manager.service";

@Injectable({providedIn: 'root'})

export class AuthenticationService {

  private isLogIn = false;

  constructor(private localStoreManager:LocalStoreManager,
              private http: HttpClient,
              private router: Router) {
      this.localStoreManager.initialiseStorageSyncListener();
  }

  isAuthenticated() {
      if(localStorage.getItem("remember") === null) {
          return false;
      }
      if(localStorage.getItem('remember') === 'true') {
          return !!localStorage.getItem('token');
      } else {
          return !!this.localStoreManager.getData('token');
      }
  }

  login(userLogin: IReqUserLogin) {
    return this.http.post<IResUserLogin>('api/auth/login', userLogin);
  }

  getAuthorizationToken() {
      if(localStorage.getItem("remember") === null) {
          return false;
      }
      if(localStorage.getItem('remember') === 'true') {
          return localStorage.getItem('token');

      } else {
          return this.localStoreManager.getData('token');
      }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('remember');
    this.localStoreManager.deleteData('token');
    this.router.navigate(['/admin/auth/login']);
  }

  setIsLogin(b: boolean) {
    this.isLogIn = true;
  }
}
export interface IReqUserLogin {
  email: string;
  password: string;
}
export interface IResUserLogin {
  email: string;
  token: string;
}
