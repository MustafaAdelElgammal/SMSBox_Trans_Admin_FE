import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
           if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            if(error.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              localStorage.removeItem('remember');
              this.router.navigate(['/admin/auth/login']);
            }
          }
          return throwError(error);
        })
      );
  }
}
