// login.component.ts
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports:[FormsModule],
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
