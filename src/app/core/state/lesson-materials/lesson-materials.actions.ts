import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LessonMaterial } from "../../models/LessonMaterial";

export const LESSON_MATERIALS_FEATURE_KEY = 'lessonMaterials';

export const LessonMaterialsActions = createActionGroup({
  source: LESSON_MATERIALS_FEATURE_KEY,
  events: {
    // Load materials for a lesson
    loadLessonMaterials: props<{ lessonId: string }>(),
    loadLessonMaterialsSuccess: props<{ lessonId: string; materials: LessonMaterial[] }>(),
    loadLessonMaterialsFailure: props<{ lessonId: string; error: any }>(),

    // Clear materials for a lesson
    clearLessonMaterials: props<{ lessonId: string }>(),

    // Clear all materials
    clearAllMaterials: emptyProps(),
  }
});
