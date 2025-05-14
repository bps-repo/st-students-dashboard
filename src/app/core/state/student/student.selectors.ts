import {createFeatureSelector, createSelector} from "@ngrx/store";
import {studentAdapter, StudentState} from "./student.state";
import {STUDENT_FEATURE_KEY} from "./studentActions";


const selectStudentState = createFeatureSelector<StudentState>(STUDENT_FEATURE_KEY);

export const StudentSelectors = {
  student: createSelector(selectStudentState, state => state.student),
  loading: createSelector(selectStudentState, state => state.loading),
  errors: createSelector(selectStudentState, state => state.errors),
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = studentAdapter.getSelectors(selectStudentState);

export const selectAllStudents = selectAll;
export const selectStudentTotal = selectTotal;
export const selectStudentEntities = selectEntities;
export const selectStudentIds = selectIds;
