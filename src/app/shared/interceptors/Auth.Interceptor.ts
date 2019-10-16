import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getAuthorizationToken();
    if(token) {
      const cloned = req.clone({
        headers: req.headers.set('Authentication', `${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
