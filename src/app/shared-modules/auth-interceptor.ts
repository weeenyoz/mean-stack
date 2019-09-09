import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { LoginService } from "../login/login.service";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private loginService: LoginService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = this.loginService.getToken();
      if (authToken) {
         console.log(authToken);
         const authRequest= req.clone({ setHeaders: { Authorization: authToken } });
         return next.handle(authRequest);
      }
      return next.handle(req);
   }
}