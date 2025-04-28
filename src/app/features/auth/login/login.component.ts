// login.component.ts
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {login} from "../../../core/state/auth/auth.actions";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Dispatch login action
      this.store.dispatch(login({email: this.loginForm.value.email, password: this.loginForm.value.password}));
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
