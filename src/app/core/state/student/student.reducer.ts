import {createFeature, createReducer, on} from "@ngrx/store";
import {StudentActions, STUDENT_FEATURE_KEY} from "./studentActions";
import {initialState} from "./student.state";

export const studentFeature = createFeature({
  name: STUDENT_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(StudentActions.loadStudent, (state) => ({
      ...state,
      errors: null,
      loading: true,
    })),
    on(StudentActions.loadStudentSuccess, (state, {student}) => ({
        ...state,
        student,
        loading: false,
        errors: null,
      }
    )),
    on(StudentActions.loadStudentFailure, (state, {errors}) => ({
      ...state,
      errors,
      loading: false
    })),
    on(StudentActions.clearStudent, (state) => ({
      ...state,
      student: null,
      loading: false,
      errors: null,
    }))
  )
})
