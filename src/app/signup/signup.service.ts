import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private backendUrl = 'http://localhost:3000/api/users';
  private userAuthenticatedSubjectListener = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUserAuthenticatedStatus() {
    return this.userAuthenticatedSubjectListener.asObservable();
  }

  createUser(newUser) {
    return this.http.post<{message: string, user: any}>(`${this.backendUrl}/signup`, newUser).subscribe(
      (res: {message: string, user: any}) => {
        this.router.navigate(['/login']);
        return res;
      }, 
      error => {
        console.log(error);
        this.userAuthenticatedSubjectListener.next(false);
      }
    );
  }

}
