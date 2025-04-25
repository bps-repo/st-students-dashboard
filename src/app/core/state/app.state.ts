import { RouterReducerState } from '@ngrx/router-store';
import { AuthState, initialAuthState } from './auth/auth.state';
import { UnitsState, initialUnitsState } from './units/units.state';

/**
 * Interface for the root state of the application
 */
export interface AppState {
  router: RouterReducerState;
  auth: AuthState;
  units: UnitsState;
  // Other feature states will be added here
}

/**
 * Initial state for the application
 */
export const initialAppState: AppState = {
  router: {} as RouterReducerState,
  auth: initialAuthState,
  units: initialUnitsState,
  // Other initial feature states will be added here
};
