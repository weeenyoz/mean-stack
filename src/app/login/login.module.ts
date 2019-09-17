import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
   declarations: [
      SignupComponent,
      LoginComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AngularMaterialModule,
      LoginRoutingModule
   ]
})
export class LoginModule{}