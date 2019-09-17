import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private userAuthenticatedSubjectListener = new Subject();
  private backendUrl: String = environment.apiUrl + 'users';

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
