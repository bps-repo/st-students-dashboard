import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from './auth.state';
import {AuthResponse} from "../../dtos/auth-response";

/**
 * Login Actions
 */
export const authFeatureKey = 'auth';

export const authActions = createActionGroup(
  {
    source: authFeatureKey,
    events: {
      login: props<{ email: string; password: string }>(),
      loginSuccess: props<{ authResponse: AuthResponse, user: User }>(),
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
      getUserSuccess: props<{ user: User }>(),
      getUserFailure: props<{ error: string }>(),
    },
  }
)

