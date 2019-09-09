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
          this.tokenTimer = setTimeout(() => { 
            console.log('** User Token Expired, Logging User Out **');
            this.logout();
          }, expiresIn * 1000)
          this.userIsAuthenticated = true;
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
    this.router.navigate(['', 'login']);
  }
}
