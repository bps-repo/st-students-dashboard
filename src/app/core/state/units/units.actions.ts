import {createAction, props} from '@ngrx/store';
import {Unit} from '../../../features/@types/unit';

/**
 * Load Units Actions
 */


export const loadUnits = createAction('[Units] Load Units');

export const loadUnitsSuccess = createAction(
  '[Units] Load Units Success',
  props<{ units: Unit[] }>()
);

export const loadUnitsFailure = createAction(
  '[Units] Load Units Failure',
  props<{ error: string }>()
);

/**
 * Select Unit Action
 */
export const selectUnit = createAction(
  '[Units] Select Unit',
  props<{ unitId: string }>()
);

/**
 * Update Unit Status Actions
 */
export const updateUnitStatus = createAction(
  '[Units] Update Unit Status',
  props<{ unitId: string; status: string }>()
);

export const updateUnitStatusSuccess = createAction(
  '[Units] Update Unit Status Success',
  props<{ unit: Unit }>()
);

export const updateUnitStatusFailure = createAction(
  '[Units] Update Unit Status Failure',
  props<{ error: string }>()
);
