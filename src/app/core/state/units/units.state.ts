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
 * Mock units for initial state
 */
const mockUnits: Unit[] = [
  {
    title: 'Unit 1',
    description: 'Introduction to basics',
    status: 'available'
  },
  {
    title: 'Unit 2',
    description: 'Fundamental concepts',
    status: 'available'
  },
  {
    title: 'Unit 3',
    description: 'Intermediate topics',
    status: 'available'
  },
  {
    title: 'Unit 4',
    description: 'Advanced material',
    status: 'available'
  }
];

/**
 * Initial units state
 */
export const initialUnitsState: UnitsState = unitsAdapter.addMany(
  mockUnits,
  unitsAdapter.getInitialState({
    selectedUnitId: null,
    isLoading: false,
    error: null,
  })
);
