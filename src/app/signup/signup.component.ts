import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  isInconsistentPw: boolean;

  constructor(
    private signupService: SignupService
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),      
      email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(3)]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
    console.log(this.signUpForm.invalid)
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    } else {
      console.log(this.signUpForm.value);
      const { username, email, password } = this.signUpForm.value;
      const newUser = {
        newUsername: username,
        newEmail: email,
        newPassword: password
      }
      console.log(this.signupService.createUser(newUser));
      this.signUpForm.reset();
    }
  }

}
