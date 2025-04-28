import {createReducer, on} from '@ngrx/store';
import {initialAuthState} from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, {authResponse}) => ({
    ...state,
    authResponse,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.logoutSuccess, () => ({
    ...initialAuthState,
  })),

  // Reset Password
  on(AuthActions.resetPassword, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.resetPasswordSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(AuthActions.resetPasswordFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Verify OTP
  on(AuthActions.verifyOtp, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.verifyOtpSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(AuthActions.verifyOtpFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Get User
  on(AuthActions.getUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.getUserSuccess, (state, {user}) => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.getUserFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
