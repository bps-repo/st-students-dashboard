import {createFeatureSelector, createSelector} from "@ngrx/store";
import {StudentState} from "./student.state";
import {STUDENT_FEATURE_KEY} from "./studentActions";


const selectStudent = createFeatureSelector<StudentState>(STUDENT_FEATURE_KEY);

export const StudentSelectors = {
  student: createSelector(selectStudent, state => state.student),
  loading: createSelector(selectStudent, state => state.loading),
  errors: createSelector(selectStudent, state => state.errors),
}
