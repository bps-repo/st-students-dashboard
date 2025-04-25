import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../../features/@types/lesson';

/**
 * Load Lessons Actions
 */
export const loadLessons = createAction(
  '[Lessons] Load Lessons',
  props<{ courseId?: string }>()
);

export const loadLessonsSuccess = createAction(
  '[Lessons] Load Lessons Success',
  props<{ lessons: Lesson[] }>()
);

export const loadLessonsFailure = createAction(
  '[Lessons] Load Lessons Failure',
  props<{ error: string }>()
);

/**
 * Load Lesson Actions
 */
export const loadLesson = createAction(
  '[Lessons] Load Lesson',
  props<{ lessonId: string }>()
);

export const loadLessonSuccess = createAction(
  '[Lessons] Load Lesson Success',
  props<{ lesson: Lesson }>()
);

export const loadLessonFailure = createAction(
  '[Lessons] Load Lesson Failure',
  props<{ error: string }>()
);

/**
 * Select Lesson Action
 */
export const selectLesson = createAction(
  '[Lessons] Select Lesson',
  props<{ lessonId: string }>()
);

/**
 * Select Course Action
 */
export const selectCourse = createAction(
  '[Lessons] Select Course',
  props<{ courseId: string }>()
);

/**
 * Add Lesson Actions
 */
export const addLesson = createAction(
  '[Lessons] Add Lesson',
  props<{ lesson: Lesson }>()
);

export const addLessonSuccess = createAction(
  '[Lessons] Add Lesson Success',
  props<{ lesson: Lesson }>()
);

export const addLessonFailure = createAction(
  '[Lessons] Add Lesson Failure',
  props<{ error: string }>()
);

/**
 * Update Lesson Actions
 */
export const updateLesson = createAction(
  '[Lessons] Update Lesson',
  props<{ lessonId: string; changes: Partial<Lesson> }>()
);

export const updateLessonSuccess = createAction(
  '[Lessons] Update Lesson Success',
  props<{ lesson: Lesson }>()
);

export const updateLessonFailure = createAction(
  '[Lessons] Update Lesson Failure',
  props<{ error: string }>()
);

/**
 * Delete Lesson Actions
 */
export const deleteLesson = createAction(
  '[Lessons] Delete Lesson',
  props<{ lessonId: string }>()
);

export const deleteLessonSuccess = createAction(
  '[Lessons] Delete Lesson Success',
  props<{ lessonId: string }>()
);

export const deleteLessonFailure = createAction(
  '[Lessons] Delete Lesson Failure',
  props<{ error: string }>()
);

/**
 * Toggle Favorite Lesson Actions
 */
export const toggleFavoriteLesson = createAction(
  '[Lessons] Toggle Favorite Lesson',
  props<{ lessonId: string }>()
);

export const toggleFavoriteLessonSuccess = createAction(
  '[Lessons] Toggle Favorite Lesson Success',
  props<{ lesson: Lesson }>()
);

export const toggleFavoriteLessonFailure = createAction(
  '[Lessons] Toggle Favorite Lesson Failure',
  props<{ error: string }>()
);

/**
 * Set Filters Action
 */
export const setFilters = createAction(
  '[Lessons] Set Filters',
  props<{
    filters: {
      courseId?: string;
      status?: string;
      type?: string;
      isFavorite?: boolean;
    }
  }>()
);
