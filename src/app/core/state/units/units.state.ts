import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Unit} from "../../models/Unit";

/**
 * Units state interface using entity adapter for normalized state
 */
export interface UnitsState extends EntityState<Unit> {
  selectedUnitId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Entity adapter for units
 */
export const unitsAdapter: EntityAdapter<Unit> = createEntityAdapter<Unit>({
  // Use unitId as the unique identifier
  selectId: (unit: Unit) => unit.unitId,
  // Sort by orderUnit to maintain correct unit order
  sortComparer: (a: Unit, b: Unit) => Number(a.orderUnit) - Number(b.orderUnit),
});

/**
 * Initial units state
 */
export const initialUnitsState: UnitsState = unitsAdapter.getInitialState(
  unitsAdapter.getInitialState({
    selectedUnitId: null,
    isLoading: false,
    error: null,
  })
);
