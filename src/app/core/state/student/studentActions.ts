import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Student} from "../../models/Student";

export const STUDENT_FEATURE_KEY = "student";

export const StudentActions = createActionGroup(
  {
    source: STUDENT_FEATURE_KEY,
    events: {
      loadStudent: emptyProps(),
      loadStudentSuccess: props<{ student: Student }>(),
      loadStudentFailure: props<{ errors: any }>(),
      clearStudent: emptyProps(),
    }
  }
)
