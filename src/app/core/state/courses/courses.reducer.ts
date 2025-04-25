import { createReducer, on } from '@ngrx/store';
import { initialCoursesState, coursesAdapter } from './courses.state';
import * as CoursesActions from './courses.actions';

export const coursesReducer = createReducer(
  initialCoursesState,

  // Load Courses
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CoursesActions.loadCoursesSuccess, (state, { courses }) =>
    coursesAdapter.setAll(courses, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Select Course
  on(CoursesActions.selectCourse, (state, { courseId }) => ({
    ...state,
    selectedCourseId: courseId,
  })),

  // Add Course
  on(CoursesActions.addCourse, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CoursesActions.addCourseSuccess, (state, { course }) =>
    coursesAdapter.addOne(course, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(CoursesActions.addCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Course
  on(CoursesActions.updateCourse, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CoursesActions.updateCourseSuccess, (state, { course }) =>
    coursesAdapter.updateOne(
      {
        id: course.label,
        changes: course,
      },
      {
        ...state,
        isLoading: false,
        error: null,
      }
    )
  ),

  on(CoursesActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Delete Course
  on(CoursesActions.deleteCourse, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CoursesActions.deleteCourseSuccess, (state, { courseId }) =>
    coursesAdapter.removeOne(courseId, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
