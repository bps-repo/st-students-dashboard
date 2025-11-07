import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LessonMaterialsState } from "./lesson-materials.state";
import { LESSON_MATERIALS_FEATURE_KEY } from "./lesson-materials.actions";

const selectLessonMaterialsState = createFeatureSelector<LessonMaterialsState>(LESSON_MATERIALS_FEATURE_KEY);

export const LessonMaterialsSelectors = {
  selectMaterialsByLesson: (lessonId: string) => createSelector(
    selectLessonMaterialsState,
    state => state.materialsByLesson[lessonId] || []
  ),

  selectMaterialsLoading: (lessonId: string) => createSelector(
    selectLessonMaterialsState,
    state => state.loading[lessonId] || false
  ),

  selectMaterialsError: (lessonId: string) => createSelector(
    selectLessonMaterialsState,
    state => state.errors[lessonId] || null
  ),

  selectAllMaterials: createSelector(
    selectLessonMaterialsState,
    state => state.materialsByLesson
  )
};
