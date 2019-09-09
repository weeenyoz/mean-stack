import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private backendUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(newUser) {
    return this.http.post<{message: string, user: any}>(`${this.backendUrl}/new`, newUser).subscribe(
      (res: {message: string, user: any}) => {
        console.log(res);
        return res;
      }, 
      error => console.log(error)
    );
  }

}
