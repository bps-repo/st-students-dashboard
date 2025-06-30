import { createAction, props } from '@ngrx/store';
import {Course} from "../../../@types/course";

/**
 * Load Courses Actions
 */
export const loadCourses = createAction(
  '[Courses] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: string }>()
);

/**
 * Select Course Action
 */
export const selectCourse = createAction(
  '[Courses] Select Course',
  props<{ courseId: string }>()
);

/**
 * Add Course Actions
 */
export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ course: Course }>()
);

export const addCourseSuccess = createAction(
  '[Courses] Add Course Success',
  props<{ course: Course }>()
);

export const addCourseFailure = createAction(
  '[Courses] Add Course Failure',
  props<{ error: string }>()
);

/**
 * Update Course Actions
 */
export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ courseId: string; changes: Partial<Course> }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: string }>()
);

/**
 * Delete Course Actions
 */
export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ courseId: string }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ courseId: string }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: string }>()
);
