import { createFeature, createReducer, on } from '@ngrx/store';
import { initialLessonsState, lessonsAdapter } from './lessons.state';
import { LESSON_FEATURE_KEY, LessonsActions } from "./lessons.actions";

export const lessonFeature = createFeature(
  {
    name: LESSON_FEATURE_KEY,
    reducer: createReducer(
      initialLessonsState,
      // Load Lessons
      on(LessonsActions.loadLessons, (state, { status }) => ({
        ...state,
        isLoading: true,
        error: null,
        filters: {
          status: status || undefined,
        },
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

      // Load Lesson History
      on(LessonsActions.loadLessonHistory, (state) => ({
        ...state,
        history: {
          ...state.history,
          isLoading: true,
          error: null,
        },
      })),

      on(LessonsActions.loadLessonHistorySuccess, (state, { lessons }) => ({
        ...state,
        history: {
          ...state.history,
          lessons,
          isLoading: false,
          error: null,
        },
      })),

      on(LessonsActions.loadLessonHistoryFailure, (state, { error }) => ({
        ...state,
        history: {
          ...state.history,
          isLoading: false,
          error,
        },
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

      // Clear Selection
      on(LessonsActions.clearSelection, (state) => ({
        ...state,
        selectedLessonId: null,
        selectedCourseId: null,
      })),

      // Clear Lessons
      on(LessonsActions.clearLessons, () => ({
        ...initialLessonsState
      }))
    )
  }
);
