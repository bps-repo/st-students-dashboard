import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  /**
   * Login effect
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user) => {
            this.alertService.success('Login successful');
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            this.alertService.error(error.message || 'Login failed');
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  /**
   * Login success effect - Navigate to home page
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  /**
   * Logout effect
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.alertService.info('You have been logged out');
            return AuthActions.logoutSuccess();
          }),
          catchError((error) => {
            this.alertService.error(error.message || 'Logout failed');
            return of(AuthActions.logoutSuccess()); // Still logout even if API fails
          })
        )
      )
    )
  );

  /**
   * Logout success effect - Navigate to login page
   */
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  /**
   * Reset password effect
   */
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap(({ email }) =>
        this.authService.resetPassword(email).pipe(
          map(() => {
            this.alertService.success(`Verification code sent to ${email}`);
            return AuthActions.resetPasswordSuccess();
          }),
          catchError((error) => {
            this.alertService.error(error.message || 'Failed to send verification code');
            return of(AuthActions.resetPasswordFailure({ error: error.message }));
          })
        )
      )
    )
  );

  /**
   * Verify OTP effect
   */
  verifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOtp),
      exhaustMap(({ email, otp }) =>
        this.authService.verifyOtp(email, otp).pipe(
          map(() => {
            this.alertService.success('Verification successful');
            return AuthActions.verifyOtpSuccess();
          }),
          catchError((error) => {
            this.alertService.error(error.message || 'Verification failed');
            return of(AuthActions.verifyOtpFailure({ error: error.message }));
          })
        )
      )
    )
  );

  /**
   * Get current user effect
   */
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      exhaustMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => {
            if (user) {
              return AuthActions.getUserSuccess({ user });
            }
            return AuthActions.getUserFailure({ error: 'User not found' });
          }),
          catchError((error) => {
            return of(AuthActions.getUserFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
