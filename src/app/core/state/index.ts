import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { unitsReducer } from './units/units.reducer';
import { UnitsEffects } from './units/units.effects';

/**
 * Root reducer map for the application
 */
export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  units: unitsReducer,
  // Other feature reducers will be added here
};

/**
 * Meta-reducers for the application
 * These are executed in order before the actual reducers
 */
export const metaReducers: MetaReducer<AppState>[] = [];

/**
 * Effects for the application
 */
export const effects = [
  AuthEffects,
  UnitsEffects,
  // Other feature effects will be added here
];

/**
 * Re-export the AppState interface
 */
export * from './app.state';
