import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {UrlInterceptor} from "./url.interceptor";
import {AuthInterceptor} from "./Auth.Interceptor";
import {HttpErrorInterceptor} from './error.interceptor';
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: UrlInterceptor },
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: HttpErrorInterceptor},
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor}
];
