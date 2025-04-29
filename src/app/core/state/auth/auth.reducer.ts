import {createFeature, createReducer, on} from '@ngrx/store';
import {initialAuthState} from './auth.state';
import {authActions, authFeatureKey} from "./auth.actions";

export const authFeature = createFeature(
  {
    name: authFeatureKey,
    reducer: createReducer
    (initialAuthState,
      // Login
      on(authActions.login, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(authActions.loginSuccess, (state, {authResponse}) => ({
        ...state,
        authResponse,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })),

      on(authActions.loginFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Logout
      on(authActions.logout, (state) => ({
        ...state,
        isLoading: true,
      })),

      on(authActions.logoutSuccess, () => ({
        ...initialAuthState,
      })),

      // Reset Password
      on(authActions.resetPassword, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(authActions.resetPasswordSuccess, (state) => ({
        ...state,
        isLoading: false,
      })),

      on(authActions.resetPasswordFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Verify OTP
      on(authActions.verifyOtp, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(authActions.verifyOtpSuccess, (state) => ({
        ...state,
        isLoading: false,
      })),

      on(authActions.verifyOtpFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Get User
      on(authActions.getUser, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(authActions.getUserSuccess, (state, {user}) => ({
        ...state,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })),

      on(authActions.getUserFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })))
  }
);
