import { createFeature } from '@ngrx/store';
import { lessonMaterialsReducer } from './lesson-materials.reducer';
import { LESSON_MATERIALS_FEATURE_KEY } from './lesson-materials.actions';

export const lessonMaterialsFeature = createFeature({
  name: LESSON_MATERIALS_FEATURE_KEY,
  reducer: lessonMaterialsReducer
});
