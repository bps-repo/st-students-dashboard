import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

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
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial authentication state
 */
export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
