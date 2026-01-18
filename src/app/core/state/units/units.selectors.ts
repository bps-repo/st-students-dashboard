import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UnitsState, unitsAdapter} from './units.state';

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
 * Select all units (already sorted by orderUnit via entity adapter)
 */
export const selectAllUnits = selectAll;

/**
 * Select all units sorted by orderUnit (redundant but explicit)
 */
export const selectAllUnitsSorted = createSelector(
  selectAll,
  (units) => [...units].sort((a, b) => Number(a.orderUnit) - Number(b.orderUnit))
);


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
 * Select unit by ID
 */
export const selectUnitById = (unitId: string) => createSelector(
  selectEntities,
  (entities) => entities[unitId] || null
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

