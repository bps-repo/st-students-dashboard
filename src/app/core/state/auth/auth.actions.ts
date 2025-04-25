import { createAction, props } from '@ngrx/store';
import { User } from './auth.state';

/**
 * Login Actions
 */
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

/**
 * Logout Actions
 */
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

/**
 * Reset Password Actions
 */
export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ email: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: string }>()
);

/**
 * Verify OTP Actions
 */
export const verifyOtp = createAction(
  '[Auth] Verify OTP',
  props<{ email: string; otp: string }>()
);

export const verifyOtpSuccess = createAction(
  '[Auth] Verify OTP Success'
);

export const verifyOtpFailure = createAction(
  '[Auth] Verify OTP Failure',
  props<{ error: string }>()
);

/**
 * Get User Actions
 */
export const getUser = createAction('[Auth] Get User');

export const getUserSuccess = createAction(
  '[Auth] Get User Success',
  props<{ user: User }>()
);

export const getUserFailure = createAction(
  '[Auth] Get User Failure',
  props<{ error: string }>()
);
