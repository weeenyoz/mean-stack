import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private loginService: LoginService,
      private router: Router
   ) {}

   canActivate(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
         const isAuthorised = this.loginService.getAuthenticatedStatus();
         if (!isAuthorised) {
            this.router.navigate(['/login']);
         } else {
            return isAuthorised;
         }
      }
}