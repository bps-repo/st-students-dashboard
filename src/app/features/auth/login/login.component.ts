// login.component.ts
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {AuthActions} from "../../../core/state/auth/authActions";
import {Observable} from "rxjs";
import {authSelectors} from "../../../core/state/auth/auth.selectors";


interface errorResponse {
  message: string;
  code: string;
  data: {
    email?: string[];
    password?: string[];
  }
  timestamp: string;
  error: string
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  isLoading$: Observable<boolean>;
  errors$: Observable<Partial<errorResponse> | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.isLoading$ = this.store.select(authSelectors.loading)
    this.errors$ = this.store.select(authSelectors.error)
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Dispatch login action
      this.store.dispatch(AuthActions.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }));
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
