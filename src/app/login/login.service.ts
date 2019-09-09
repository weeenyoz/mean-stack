import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserAuthenticatedListener = new Subject<boolean>();
  private token: string;
  private backendUrl = 'http://localhost:3000/api/auth';
  private userIsAuthenticated: boolean = false;
  private tokenTimer: NodeJS.Timer;

  constructor( 
    private http: HttpClient,
    private router: Router
  ) { }

  getToken() {
    return this.token;
  }

  getAuthenticatedStatus() {
    return this.userIsAuthenticated;
  }

  getUserAuthenticationSubject() {
    return this.isUserAuthenticatedListener.asObservable();
  }

  login(password: string, email: string) {
    const credentials = { loginPassword: password, loginEmail: email }
    return this.http.post<{message: string, token: string, expiresIn: number}>(`${this.backendUrl}/login`, credentials).subscribe(
      (res: {message: string, token: string, expiresIn: number}) => {
        const { message, token, expiresIn } = res;
        this.token = token; 
        if (token) {
          this.setLogoutTimer(expiresIn);
          this.userIsAuthenticated = true;

          // create the expiry date out of the duration which the user can stay logged in
          const now = new Date();
          const expiryDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthTokenData(token, expiryDate);

          this.isUserAuthenticatedListener.next(true);
          this.router.navigate(['', 'list']);
        }
      },
      error => console.log(error)
    );
  }

  logout() {
    this.token = null;
    this.userIsAuthenticated = false;
    this.isUserAuthenticatedListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthTokenData();
    this.router.navigate(['', 'login']);
  }

  // save authenticated user's token data into storage
  private saveAuthTokenData(token: string, expiryDate: Date) {
    localStorage.setItem('authenticatedUserToken', token);
    localStorage.setItem('tokenExpiryDate', expiryDate.toISOString());
  }

  // clear authenticated user's token data from storage
  private clearAuthTokenData() {
    localStorage.removeItem('authenticatedUserToken');
    localStorage.removeItem('tokenExpiryDate');
  }

  authoAuthData() {

      // on init the app has to remember that the user is still logged in
      // hence, we need to refresh the app's memory: 
      // each time the app refreshes / when the user refreshes the browser,
      // we check if the token's expired or not

      // retrieve the token from the storage, check if the token has expired. 
      if (!this.getTokenData()) {
        return;
      }
      const { tokenFromStorage, expDateFromStorage } = this.getTokenData();

      // if token's expiry date is earlier than current date, then it has expired
      const now = new Date();
      const userLoginDurationExpired: boolean = expDateFromStorage < now;
      if (userLoginDurationExpired) {
        this.logout();
      } else {
        // This Process is just like what we do (to set this.userIsAuthenticated = true etc) when user has just logged in.
        
        // else if token's exipry date is later than current date, then it hasn't expired yet.
        // else if not expired, keep user logged in:
        // re-append the token from storage (which has yet to expire) to this.tokem,
        // set userIsAuthenticated to true as well, as like when user just logged in. (we're reminding the app 
        // / browser, after user refreshed, that the token is still valid and user can still stay logged in)

        const expiryDuration = expDateFromStorage.getTime() - now.getTime(); // milli second
        console.log(expiryDuration);
        this.token = tokenFromStorage;
        this.userIsAuthenticated = true;
        this.isUserAuthenticatedListener.next(true);
        this.setLogoutTimer(expiryDuration/1000);
      }    
  }

  private setLogoutTimer(expiryDuration: number) { // second
    this.tokenTimer = setTimeout(() => { 
      console.log('** User Token Expired, Logging User Out **');
      this.logout();
    }, expiryDuration * 1000); // set time out only uses milli seconds
  }

  private getTokenData() {
    const token = localStorage.getItem('authenticatedUserToken');
    const expDate = localStorage.getItem('tokenExpiryDate');

    if (!token || !expDate) {
      // if there's no token / date, the function returns nothing
      return; 
    } else {
      return {
        tokenFromStorage: token,
        expDateFromStorage: new Date(expDate)
      }
    }
  }
}
