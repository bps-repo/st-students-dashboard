import {Injectable, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Action, Store} from '@ngrx/store';

import {AuthService, AUTH_STORAGE_KEYS} from '../../services/auth.service';
import {AuthActions} from './authActions';
import {StudentActions} from '../student/studentActions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * Initialize auth state when effects are loaded
   */
  ngrxOnInitEffects(): Action {
    return AuthActions.initAuth();
  }

  /**
   * Login effect - Authenticate user with credentials
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({email, password}) =>
        this.authService.login(email, password).pipe(
          map(authResponse => {
            if (!authResponse?.accessToken) {
              return AuthActions.loginFailure({error: 'Invalid authentication response'});
            }

            const userToken = this.authService.getUserFromToken(authResponse.accessToken);
            if (!userToken) {
              return AuthActions.loginFailure({error: 'Invalid token received'});
            }

            return AuthActions.loginSuccess({authResponse, userToken});
          }),
          catchError(error =>
            of(AuthActions.loginFailure({
              error: error.message || 'Authentication failed'
            }))
          )
        )
      )
    )
  );

  /**
   * Login success effect - Save auth data and navigate
   */
  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({authResponse, userToken}) => {
          // Save auth data to storage
          this.authService.saveAuthTokens(
            authResponse.accessToken,
            authResponse.refreshToken
          );
          this.authService.saveUser(userToken);

          // Navigate to home page
          this.router.navigate(['/home']);
        })
      ),
    {dispatch: false}
  );

  /**
   * Logout effect - Clear auth data
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess())) // Still logout on error
        )
      )
    )
  );

  /**
   * Logout success effect - Clear storage and navigate
   */
  logoutSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          // Clear auth data from storage
          this.authService.clearAuthData();

          // Clear related state
          this.store.dispatch(StudentActions.clearStudent());

          // Navigate to login page
          this.router.navigate(['/auth/login']);
        })
      ),
    {dispatch: false}
  );

  /**
   * Reset password effect
   */
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap(({email}) =>
        this.authService.resetPassword(email).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError(error =>
            of(AuthActions.resetPasswordFailure({
              error: error.message || 'Failed to send verification code'
            }))
          )
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
      exhaustMap(({email, otp}) =>
        this.authService.verifyOtp(email, otp).pipe(
          map(() => AuthActions.verifyOtpSuccess()),
          catchError(error =>
            of(AuthActions.verifyOtpFailure({
              error: error.message || 'Verification failed'
            }))
          )
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
          map(user => AuthActions.getUserSuccess({user})),
          catchError(error =>
            of(AuthActions.getUserFailure({
              error: error.message || 'Failed to get user information'
            }))
          )
        )
      )
    )
  );

  /**
   * Init auth effect - Check for stored auth data
   */
  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      map(() => {
        const accessToken = this.authService.getAccessToken();

        if (!accessToken) {
          return AuthActions.initAuthFailure();
        }

        return AuthActions.initAuthSuccess({accessToken});
      })
    )
  );

  /**
   * Init auth success effect - Load user and student data
   */
  initAuthSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.initAuthSuccess),
        tap(() => {
          this.store.dispatch(AuthActions.getUser());
          this.store.dispatch(StudentActions.loadStudent());
        })
      ),
    {dispatch: false}
  );
}
