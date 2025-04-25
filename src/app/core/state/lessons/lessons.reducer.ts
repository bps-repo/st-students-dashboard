import { createReducer, on } from '@ngrx/store';
import { initialLessonsState, lessonsAdapter } from './lessons.state';
import * as LessonsActions from './lessons.actions';

export const lessonsReducer = createReducer(
  initialLessonsState,

  // Load Lessons
  on(LessonsActions.loadLessons, (state, { courseId }) => ({
    ...state,
    selectedCourseId: courseId || state.selectedCourseId,
    isLoading: true,
    error: null,
  })),

  on(LessonsActions.loadLessonsSuccess, (state, { lessons }) =>
    lessonsAdapter.setAll(lessons, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(LessonsActions.loadLessonsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Load Lesson
  on(LessonsActions.loadLesson, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(LessonsActions.loadLessonSuccess, (state, { lesson }) =>
    lessonsAdapter.upsertOne(lesson, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(LessonsActions.loadLessonFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Select Lesson
  on(LessonsActions.selectLesson, (state, { lessonId }) => ({
    ...state,
    selectedLessonId: lessonId,
  })),

  // Select Course
  on(LessonsActions.selectCourse, (state, { courseId }) => ({
    ...state,
    selectedCourseId: courseId,
  })),

  // Add Lesson
  on(LessonsActions.addLesson, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(LessonsActions.addLessonSuccess, (state, { lesson }) =>
    lessonsAdapter.addOne(lesson, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(LessonsActions.addLessonFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Lesson
  on(LessonsActions.updateLesson, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(LessonsActions.updateLessonSuccess, (state, { lesson }) =>
    lessonsAdapter.updateOne(
      {
        id: lesson.id || lesson.label,
        changes: lesson,
      },
      {
        ...state,
        isLoading: false,
        error: null,
      }
    )
  ),

  on(LessonsActions.updateLessonFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Delete Lesson
  on(LessonsActions.deleteLesson, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(LessonsActions.deleteLessonSuccess, (state, { lessonId }) =>
    lessonsAdapter.removeOne(lessonId, {
      ...state,
      isLoading: false,
      error: null,
    })
  ),

  on(LessonsActions.deleteLessonFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Toggle Favorite Lesson
  on(LessonsActions.toggleFavoriteLesson, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(LessonsActions.toggleFavoriteLessonSuccess, (state, { lesson }) =>
    lessonsAdapter.updateOne(
      {
        id: lesson.id || lesson.label,
        changes: lesson,
      },
      {
        ...state,
        isLoading: false,
        error: null,
      }
    )
  ),

  on(LessonsActions.toggleFavoriteLessonFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Set Filters
  on(LessonsActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  }))
);
