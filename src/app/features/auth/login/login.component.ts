// login.component.ts
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Handle login logic here
    }
  }

  loginWithGoogle() {
    console.log('Login with Google');
    // Implement Google login
  }

  loginWithFacebook() {
    console.log('Login with Facebook');
    // Implement Facebook login
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
