import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Unit } from '../../../features/@types/unit';

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
  // Use title as the ID since we don't have a proper ID in the mock data
  selectId: (unit: Unit) => unit.title,
  // Sort by title
  sortComparer: (a: Unit, b: Unit) => a.title.localeCompare(b.title),
});

/**
 * Initial units state
 */
export const initialUnitsState: UnitsState = unitsAdapter.getInitialState({
  selectedUnitId: null,
  isLoading: true,
  error: null,
});
