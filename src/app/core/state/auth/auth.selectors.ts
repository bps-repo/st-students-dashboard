import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.state';

const selectAuth = createFeatureSelector<AuthState>('auth');

export const authSelectors = {
  user: createSelector(selectAuth, (state: AuthState) => state.user),
  loading: createSelector(selectAuth, (state: AuthState) => state.isLoading),
  error: createSelector(selectAuth, (state: AuthState) => state.error),
  isAuthenticated: createSelector(selectAuth, (state: AuthState) => state.isAuthenticated),
  authResponse: createSelector(selectAuth, (state: AuthState) => state.authResponse),
  accessToken: createSelector(selectAuth, (state: AuthState) => state.authResponse?.accessToken),
  refreshToken: createSelector(selectAuth, (state: AuthState) => state.authResponse?.refreshToken),
};

