import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthResponse} from "../../dtos/auth-response";
import {UserToken} from "../../models/userToken";
import {UserProfile} from "../../dtos/user-profile";

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
      getUser: props<{ token: string }>(),
      getUserSuccess: props<{ user: UserToken }>(),
      getUserFailure: props<{ error: string }>(),
      initAuth: emptyProps(),
      initAuthSuccess: props<{ authResponse: AuthResponse, user: UserToken }>(),
      initAuthFailure: emptyProps(),

      // User Profile actions
      updateUserProfile: props<{ user: Partial<UserProfile> }>(),
      updateUserProfileSuccess: props<{ user: Partial<UserProfile> }>(),
      updateUserProfileFailure: props<{ error: any }>(),
    },
  }
)
