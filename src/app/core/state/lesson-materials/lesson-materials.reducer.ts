import { createReducer, on } from '@ngrx/store';
import { initialLessonMaterialsState } from './lesson-materials.state';
import { LessonMaterialsActions } from './lesson-materials.actions';

export const lessonMaterialsReducer = createReducer(
  initialLessonMaterialsState,

  // Load materials
  on(LessonMaterialsActions.loadLessonMaterials, (state, { lessonId }) => ({
    ...state,
    loading: {
      ...state.loading,
      [lessonId]: true
    },
    errors: {
      ...state.errors,
      [lessonId]: null
    }
  })),

  on(LessonMaterialsActions.loadLessonMaterialsSuccess, (state, { lessonId, materials }) => ({
    ...state,
    materialsByLesson: {
      ...state.materialsByLesson,
      [lessonId]: materials
    },
    loading: {
      ...state.loading,
      [lessonId]: false
    },
    errors: {
      ...state.errors,
      [lessonId]: null
    }
  })),

  on(LessonMaterialsActions.loadLessonMaterialsFailure, (state, { lessonId, error }) => ({
    ...state,
    loading: {
      ...state.loading,
      [lessonId]: false
    },
    errors: {
      ...state.errors,
      [lessonId]: error
    }
  })),

  // Clear materials for a lesson
  on(LessonMaterialsActions.clearLessonMaterials, (state, { lessonId }) => {
    const newState = { ...state };
    delete newState.materialsByLesson[lessonId];
    delete newState.loading[lessonId];
    delete newState.errors[lessonId];
    return newState;
  }),

  // Clear all materials
  on(LessonMaterialsActions.clearAllMaterials, () => initialLessonMaterialsState)
);
