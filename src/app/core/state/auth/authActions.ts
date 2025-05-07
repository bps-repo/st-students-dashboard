import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthResponse} from "../../dtos/auth-response";
import {UserToken} from "../../models/userToken";

/**
 * Login Actions
 */
export const authFeatureKey = 'auth';

export const AuthActions = createActionGroup(
  {
    source: authFeatureKey,
    events: {
      login: props<{ email: string; password: string }>(),
      loginSuccess: props<{ authResponse: AuthResponse, user: UserToken }>(),
      loginFailure: props<{ error: string }>(),
      logout: emptyProps(),
      logoutSuccess: emptyProps(),
      logoutFailure: props<{ error: string }>(),
      clearError: emptyProps(),
      resetPassword: props<{ email: string }>(),
      resetPasswordSuccess: emptyProps(),
      resetPasswordFailure: props<{ error: string }>(),
      verifyOtp: props<{ email: string; otp: string }>(),
      verifyOtpSuccess: emptyProps(),
      verifyOtpFailure: props<{ error: string }>(),
      getUser: emptyProps(),
      getUserSuccess: props<{ user: UserToken }>(),
      getUserFailure: props<{ error: string }>(),
      initAuth: emptyProps(),
      initAuthSuccess: props<{ authResponse: AuthResponse, user: UserToken }>(),
      initAuthFailure: emptyProps(),
    },
  }
)
