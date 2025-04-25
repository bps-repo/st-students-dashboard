import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitsState, unitsAdapter } from './units.state';

/**
 * Feature selector for the units state
 */
export const selectUnitsState = createFeatureSelector<UnitsState>('units');

/**
 * Entity selectors from the adapter
 */
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = unitsAdapter.getSelectors(selectUnitsState);

/**
 * Select all units
 */
export const selectAllUnits = selectAll;

/**
 * Select the total number of units
 */
export const selectUnitCount = selectTotal;

/**
 * Select the selected unit ID
 */
export const selectSelectedUnitId = createSelector(
  selectUnitsState,
  (state: UnitsState) => state.selectedUnitId
);

/**
 * Select the selected unit
 */
export const selectSelectedUnit = createSelector(
  selectEntities,
  selectSelectedUnitId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

/**
 * Select the loading status
 */
export const selectUnitsLoading = createSelector(
  selectUnitsState,
  (state: UnitsState) => state.isLoading
);

/**
 * Select the error message
 */
export const selectUnitsError = createSelector(
  selectUnitsState,
  (state: UnitsState) => state.error
);

/**
 * Select units by status
 */
export const selectUnitsByStatus = (status: string) => createSelector(
  selectAllUnits,
  (units) => units.filter(unit => unit.status === status)
);

/**
 * Select completed units
 */
export const selectCompletedUnits = selectUnitsByStatus('done');

/**
 * Select in-progress units
 */
export const selectInProgressUnits = selectUnitsByStatus('reading');

/**
 * Select locked units
 */
export const selectLockedUnits = selectUnitsByStatus('lock');
