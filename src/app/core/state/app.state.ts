import { RouterReducerState } from '@ngrx/router-store';
import { AuthState, initialAuthState } from './auth/auth.state';
import { UnitsState, initialUnitsState } from './units/units.state';
import { CoursesState, initialCoursesState } from './courses/courses.state';

/**
 * Interface for the root state of the application
 */
export interface AppState {
  router: RouterReducerState;
  auth: AuthState;
  units: UnitsState;
  courses: CoursesState;
  // Other feature states will be added here
}

/**
 * Initial state for the application
 */
export const initialAppState: AppState = {
  router: {} as RouterReducerState,
  auth: initialAuthState,
  units: initialUnitsState,
  courses: initialCoursesState,
  // Other initial feature states will be added here
};
