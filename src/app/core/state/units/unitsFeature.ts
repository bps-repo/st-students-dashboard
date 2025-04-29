import {createFeature, createReducer, on} from '@ngrx/store';
import {initialUnitsState, unitsAdapter} from './units.state';
import {UnitsActions, unitsFeatureKey} from "./units.actions";


export const unitsFeature = createFeature({
  name: unitsFeatureKey,
  reducer: createReducer(
    initialUnitsState,
    // Load Units
    on(UnitsActions.loadUnits, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(UnitsActions.loadUnitsSuccess, (state, {units}) =>
      unitsAdapter.setAll(units, {
        ...state,
        isLoading: false,
        error: null,
      })
    ),

    on(UnitsActions.loadUnitsFailure, (state, {error}) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Select Unit
    on(UnitsActions.selectUnit, (state, {unitId}) => ({
      ...state,
      selectedUnitId: unitId,
    })),

    // Update Unit Status
    on(UnitsActions.updateUnitStatus, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(UnitsActions.updateUnitStatusSuccess, (state, {unit}) =>
      unitsAdapter.updateOne(
        {
          id: unit.title,
          changes: unit
        },
        {
          ...state,
          isLoading: false,
          error: null,
        }
      )
    ),

    on(UnitsActions.updateUnitStatusFailure, (state, {error}) => ({
      ...state,
      isLoading: false,
      error,
    }))
  )
});
