import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

/**
 * Feature selector for the auth state
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * Selector for the user
 */
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

/**
 * Selector for the authentication status
 */
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

/**
 * Selector for the loading status
 */
export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

/**
 * Selector for the error message
 */
export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

/**
 * Selector for the user's name
 */
export const selectUserName = createSelector(
  selectUser,
  (user) => user?.name
);

/**
 * Selector for the user's email
 */
export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email
);
