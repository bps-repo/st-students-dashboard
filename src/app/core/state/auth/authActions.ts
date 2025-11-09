import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthResponse} from "../../dtos/auth-response";
import {UserToken} from "../../models/userToken";
import {User} from "../../models/User";

/**
 * Login Actions
 */
export const authFeatureKey = 'auth';

export const AuthActions = createActionGroup(
  {
    source: authFeatureKey,
    events: {
      login: props<{ email: string; password: string }>(),
      loginSuccess: props<{ authResponse: AuthResponse, userToken: UserToken }>(),
      loginFailure: props<{ error: string }>(),

      logout: emptyProps(),
      logoutSuccess: emptyProps(),
      logoutFailure: props<{ error: string }>(),

      clearError: emptyProps(),

      // Forgot Password (Step 1: Send OTP to email)
      forgotPassword: props<{ email: string }>(),
      forgotPasswordSuccess: props<{ message: string }>(),
      forgotPasswordFailure: props<{ error: string }>(),

      // Verify Reset Password Token (Step 2: Verify OTP)
      verifyResetPassword: props<{ resetToken: string }>(),
      verifyResetPasswordSuccess: props<{ message: string }>(),
      verifyResetPasswordFailure: props<{ error: string }>(),

      // Reset Password with Token (Step 3: Set new password)
      resetPasswordWithToken: props<{ token: string; newPassword: string }>(),
      resetPasswordWithTokenSuccess: props<{ message: string }>(),
      resetPasswordWithTokenFailure: props<{ error: string }>(),

      // Legacy actions (kept for backward compatibility)
      resetPassword: props<{ email: string }>(),
      resetPasswordSuccess: emptyProps(),
      resetPasswordFailure: props<{ error: string }>(),

      verifyOtp: props<{ email: string; otp: string }>(),
      verifyOtpSuccess: emptyProps(),
      verifyOtpFailure: props<{ error: string }>(),

      getUser: emptyProps(),
      getUserSuccess: props<{ user: User }>(),
      getUserFailure: props<{ error: string }>(),

      initAuth: emptyProps(),
      initAuthSuccess: props<{ accessToken: string }>(),
      initAuthFailure: emptyProps(),
    },
  }
)
