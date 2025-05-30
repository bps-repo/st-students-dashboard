import {createFeature, createReducer, on} from '@ngrx/store';
import {initialLessonsState, lessonsAdapter} from './lessons.state';
import {LESSON_FEATURE_KEY, LessonsActions} from "./lessons.actions";

export const lessonFeature = createFeature(
  {
    name: LESSON_FEATURE_KEY,
    reducer: createReducer(
      initialLessonsState,
      // Load Lessons
      on(LessonsActions.loadLessons, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(LessonsActions.loadLessonsSuccess, (state, {lessons}) =>
        lessonsAdapter.setAll(lessons, {
          ...state,
          isLoading: false,
          error: null,
        })
      ),

      on(LessonsActions.loadLessonsFailure, (state, {error}) => ({
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

      on(LessonsActions.loadLessonSuccess, (state, {lesson}) =>
        lessonsAdapter.upsertOne(lesson, {
          ...state,
          isLoading: false,
          error: null,
        })
      ),

      on(LessonsActions.loadLessonFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Select Lesson
      on(LessonsActions.selectLesson, (state, {lessonId}) => ({
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
