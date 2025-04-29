import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {Unit} from '../../../features/@types/unit';

/**
 * Load Units Actions
 */
export const unitsFeatureKey = 'units';

export const UnitsActions = createActionGroup(
  {
    source: unitsFeatureKey,
    events: {
      loadUnits: emptyProps(),
      loadUnitsSuccess: props<{ units: Unit[] }>(),
      loadUnitsFailure: props<{ error: any }>(),
      selectUnit: props<{ unitId: string }>(),
      selectUnitSuccess: props<{ unit: Unit }>(),
      selectUnitFailure: props<{ error: any }>(),
      clearSelectedUnit: emptyProps(),
      clearUnits: emptyProps(),
      clearUnitsSuccess: emptyProps(),
      clearUnitsFailure: props<{ error: any }>(),
      updateUnitStatus: props<{ unitId: string; status: string }>(),
      updateUnitStatusSuccess: props<{ unit: Unit }>(),
      updateUnitStatusFailure: props<{ error: string }>(),
    },
  }
)
