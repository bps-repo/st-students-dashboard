import {Injectable, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {of, switchMap} from 'rxjs'; // Import EMPTY
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {authActions} from "./auth.actions";
import {Action, Store} from '@ngrx/store';
import {userProfileActions} from "../user-profile/user-profile.actions";

@Injectable()
export class AuthEffects implements OnInitEffects {
  actions$ = inject(Actions)
  store = inject(Store)
  authService = inject(AuthService)
  router = inject(Router)

  /**
   * This method is called when the effects are initialized
   */
  ngrxOnInitEffects(): Action {
    return authActions.initAuth();
  }

  /**
   * Login effect
   */
    // Then the login effect becomes:
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

            const user = this.authService.getUserFromToken(authResponse.accessToken);
            if (!user) {
              return authActions.loginFailure({error: 'Invalid token'});
            }

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
          localStorage.setItem('accessToken', action.authResponse.accessToken);
          localStorage.setItem('refreshToken', action.authResponse.refreshToken);
          localStorage.setItem('auth_response', JSON.stringify(action.authResponse));
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
            // Clear local storage

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
        tap(() => {
          localStorage.removeItem('auth_response');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('expiresAt');

          //clear user profile
          this.store.dispatch(userProfileActions.clearUserProfile());
          this.router.navigate(['/auth/login']).then();
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
      map((actions) => {
        try {
          // Direct call to getUserFromToken which now returns UserToken | null
          const user = this.authService.getUserFromToken(actions.token);

          if (user) {
            return authActions.getUserSuccess({user});
          } else {
            return authActions.getUserFailure({error: 'User not found'});
          }
        } catch (error) {
          // Handle any synchronous errors thrown by getUserFromToken
          const errorMessage = error instanceof Error ? error.message : 'Failed to get user';
          return authActions.getUserFailure({error: errorMessage});
        }
      })
    );
  });

  /**
   * Get user success effect - Save user to localStorage
   */
  getUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.getUserSuccess),
        tap((action) => {
        })
      );
    },
    {dispatch: false}
  );

  /**
   * Initialize auth state from localStorage
   */
  /**
   * Initialize auth state from localStorage
   */
  initAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.initAuth),
      map(() => {
        const authResponse = this.authService.getAuthResponseFromStorage();
        if (!authResponse || !authResponse.accessToken) {
          return authActions.initAuthFailure();
        }

        // Direct call since getUserFromToken returns a value, not an Observable
        const user = this.authService.getUserFromToken(authResponse.accessToken);
        if (!user) {
          return authActions.initAuthFailure();
        }

        return authActions.initAuthSuccess({authResponse, user});
      })
    );
  });
}
