import {Injectable, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {isEmpty, of} from 'rxjs'; // Import EMPTY
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AuthActions} from "./authActions";
import {Action, Store} from '@ngrx/store';
import {StudentActions} from "../student/studentActions";
import {authSelectors} from "./auth.selectors";

@Injectable()
export class AuthEffects implements OnInitEffects {
  actions$ = inject(Actions)
  store$ = inject(Store)
  authService = inject(AuthService)
  router = inject(Router)

  /**
   * This method is called when the effects are initialized
   */
  ngrxOnInitEffects(): Action {
    return AuthActions.initAuth();
  }

  /**
   * Login effect
   */
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({email, password}) => {
        return this.authService.login(email, password).pipe(
          map((authResponse) => {
            // Check if the response is empty
            if (!authResponse) {
              return AuthActions.loginFailure({error: 'Login failed'});
            }
            // Check if the response contains a token
            if (!authResponse.accessToken) {
              return AuthActions.loginFailure({error: 'Login failed'});
            }

            const user = this.authService.getUserFromToken(authResponse.accessToken)!;

            return AuthActions.loginSuccess({authResponse, user});
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({error: error.error || 'Login failed'}));
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
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          localStorage.setItem("auth_response", JSON.stringify(action.authResponse));
          localStorage.setItem('accessToken', action.authResponse.accessToken);
          localStorage.setItem('refreshToken', action.authResponse.refreshToken);

          // Load Student Information
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
      ofType(AuthActions.logout),
      exhaustMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            return AuthActions.logoutSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.logoutSuccess()); // Still logout even if API fails
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
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          // Clear all auth-related items from localStorage
          localStorage.removeItem('auth_response');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('auth_user');

          this.store$.dispatch(StudentActions.clearStudent())
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
      ofType(AuthActions.resetPassword),
      exhaustMap(({email}) => {
        return this.authService.resetPassword(email).pipe(
          map(() => {
            return AuthActions.resetPasswordSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.resetPasswordFailure({error: error.message || 'Failed to send verification code'}));
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
      ofType(AuthActions.verifyOtp),
      exhaustMap(({email, otp}) => {
        return this.authService.verifyOtp(email, otp).pipe(
          map(() => {
            return AuthActions.verifyOtpSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.verifyOtpFailure({error: error.message || 'Verification failed'}));
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
      ofType(AuthActions.getUser),
      exhaustMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((user) => {
            if (user) {
              return AuthActions.getUserSuccess({user});
            }
            return AuthActions.getUserFailure({error: 'User not found'});
          }),
          catchError((error) => {
            return of(AuthActions.getUserFailure({error: error.message || 'Failed to get user'}));
          })
        );
      })
    );
  });

  /**
   * Get user success effect - Save user to localStorage
   */
  getUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.getUserSuccess),
        tap((action) => {
          // Store the user in local storage
          this.authService.saveUser(action.user);
        })
      );
    },
    {dispatch: false}
  );

  /**
   * Initialize auth state from localStorage
   */
  initAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.initAuth),
      map(() => {
        const authResponse = this.authService.getAuthResponseFromStorage();
        if (!authResponse || !authResponse.accessToken) {
          return AuthActions.initAuthFailure();
        }

        const user = this.authService.getUserFromToken(authResponse.accessToken);
        if (!user) {
          return AuthActions.initAuthFailure();
        }
        return AuthActions.initAuthSuccess({authResponse, user});
      })
    );
  });

  initAuthSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.initAuthSuccess),
      tap(() => {
        this.store$.dispatch(StudentActions.loadStudent())
      })
    )
  }, {dispatch: false})
}
