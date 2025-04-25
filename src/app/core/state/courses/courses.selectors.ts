import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesAdapter } from './courses.state';

/**
 * Feature selector for courses state
 */
export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

/**
 * Entity selectors from the adapter
 */
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = coursesAdapter.getSelectors();

/**
 * Select all courses
 */
export const selectAllCourses = createSelector(
  selectCoursesState,
  selectAll
);

/**
 * Select course entities
 */
export const selectCourseEntities = createSelector(
  selectCoursesState,
  selectEntities
);

/**
 * Select the total number of courses
 */
export const selectCoursesTotal = createSelector(
  selectCoursesState,
  selectTotal
);

/**
 * Select the selected course ID
 */
export const selectSelectedCourseId = createSelector(
  selectCoursesState,
  (state) => state.selectedCourseId
);

/**
 * Select the selected course
 */
export const selectSelectedCourse = createSelector(
  selectCourseEntities,
  selectSelectedCourseId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

/**
 * Select the loading state
 */
export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (state) => state.isLoading
);

/**
 * Select the error state
 */
export const selectCoursesError = createSelector(
  selectCoursesState,
  (state) => state.error
);

/**
 * Select courses by type
 */
export const selectCoursesByType = (type: string) => createSelector(
  selectAllCourses,
  (courses) => courses.filter(course => course.type === type)
);
