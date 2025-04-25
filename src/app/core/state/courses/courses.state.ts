import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from '../../../features/@types/course';

/**
 * Courses state interface using entity adapter for normalized state
 */
export interface CoursesState extends EntityState<Course> {
  selectedCourseId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Entity adapter for courses
 */
export const coursesAdapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  // Use label as the ID since we don't have a proper ID in the Course interface
  selectId: (course: Course) => course.label,
  // Sort by label
  sortComparer: (a: Course, b: Course) => a.label.localeCompare(b.label),
});

/**
 * Initial courses state
 */
export const initialCoursesState: CoursesState = coursesAdapter.getInitialState({
  selectedCourseId: null,
  isLoading: false,
  error: null,
});
