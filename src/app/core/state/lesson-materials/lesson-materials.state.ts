import { LessonMaterial } from "../../models/LessonMaterial";

export interface LessonMaterialsState {
  materialsByLesson: { [lessonId: string]: LessonMaterial[] };
  loading: { [lessonId: string]: boolean };
  errors: { [lessonId: string]: string | null };
}

export const initialLessonMaterialsState: LessonMaterialsState = {
  materialsByLesson: {},
  loading: {},
  errors: {}
};
