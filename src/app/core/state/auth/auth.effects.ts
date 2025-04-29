import {Injectable, Inject, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, EMPTY} from 'rxjs'; // Import EMPTY
import {catchError, exhaustMap, map, tap, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {authActions} from "./auth.actions";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions)
  authService = inject(AuthService)
  router = inject(Router)

  /**
   * Login effect
   */
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({email, password}) => {
        return this.authService.login(email, password).pipe(
          map((authResponse) => {
            // Check if the response is empty
            if (!authResponse) {
              return authActions.loginFailure({error: 'Login failed'});
            }
            // Check if the response contains a token
            if (!authResponse.accessToken) {
              return authActions.loginFailure({error: 'Login failed'});
            }

            const user = this.authService.getUserFromToken(authResponse.accessToken)!;

            return authActions.loginSuccess({authResponse, user});
          }),
          catchError((error) => {
            return of(authActions.loginFailure({error: error.error || 'Login failed'}));
          })
        );
      })
    );
  });

  /**
   * Login success effect - Navigate to home page
   */
  loginSuccess$ = createEffect(
    () => {

      return this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap((action) => {
          console.log('action.authResponse', action.user);
          // Store the token in local storage
          localStorage.setItem("auth_response", JSON.stringify(action.authResponse));
          localStorage.setItem('accessToken', action.authResponse.accessToken);
          localStorage.setItem('refreshToken', action.authResponse.refreshToken);
          this.router.navigate(['/home']);
        })
      );
    },
    {dispatch: false}
  );

  /**
   * Logout effect
   */
  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            return authActions.logoutSuccess();
          }),
          catchError((error) => {
            return of(authActions.logoutSuccess()); // Still logout even if API fails
          })
        );
      })
    );
  });

  /**
   * Logout success effect - Navigate to login page
   */
  logoutSuccess$ = createEffect(
    () => {

      return this.actions$.pipe(
        ofType(authActions.logoutSuccess),
        tap((action) => {
          this.router.navigate(['/auth/login']);
        })
      );
    },
    {dispatch: false}
  );

  /**
   * Reset password effect
   */
  resetPassword$ = createEffect(() => {


    return this.actions$.pipe(
      ofType(authActions.resetPassword),
      exhaustMap(({email}) => {
        return this.authService.resetPassword(email).pipe(
          map(() => {
            return authActions.resetPasswordSuccess();
          }),
          catchError((error) => {
            return of(authActions.resetPasswordFailure({error: error.message || 'Failed to send verification code'}));
          })
        );
      })
    );
  });

  /**
   * Verify OTP effect
   */
  verifyOtp$ = createEffect(() => {

    return this.actions$.pipe(
      ofType(authActions.verifyOtp),
      exhaustMap(({email, otp}) => {
        return this.authService.verifyOtp(email, otp).pipe(
          map(() => {
            return authActions.verifyOtpSuccess();
          }),
          catchError((error) => {
            return of(authActions.verifyOtpFailure({error: error.message || 'Verification failed'}));
          })
        );
      })
    );
  });

  /**
   * Get current user effect
   */
  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getUser),
      exhaustMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((user) => {
            if (user) {
              return authActions.getUserSuccess({user});
            }
            return authActions.getUserFailure({error: 'User not found'});
          }),
          catchError((error) => {
            return of(authActions.getUserFailure({error: error.message || 'Failed to get user'}));
          })
        );
      })
    );
  });
}
