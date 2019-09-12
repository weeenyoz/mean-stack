import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  authenticationStatusSubscription: Subscription
  signUpForm: FormGroup;
  isInconsistentPw: boolean;
  isLoading: boolean;

  constructor(
    private signupService: SignupService
  ) { }

  ngOnInit() {

    // start listneing, whether user is signed up
    this.authenticationStatusSubscription = this.signupService.getUserAuthenticatedStatus().subscribe(
      (authenticationStatus:boolean) => {
        this.isLoading = authenticationStatus;
      }
    )

    this.signUpForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),      
      email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(3)]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  ngOnDestroy() {
    this.authenticationStatusSubscription.unsubscribe();
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    } else {
      this.isLoading = true;
      const { username, email, password } = this.signUpForm.value;
      const newUser = {
        newUsername: username,
        newEmail: email,
        newPassword: password
      }
      this.signupService.createUser(newUser);
      this.signUpForm.reset();
    }
  }

}
