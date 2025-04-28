import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  authResponse: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial authentication state
 */
export const initialAuthState: AuthState = {
  user: null,
  authResponse: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
