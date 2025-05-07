import {Student} from "../../models/Student";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface StudentState extends EntityState<Student> {
  errors: any,
  loading: boolean,
  student: Student | null,
}

export const studentAdapter: EntityAdapter<Student> = createEntityAdapter<Student>
({
  selectId: (student: Student) => student.id!,
  sortComparer: false
})

export const initialState: StudentState = studentAdapter.getInitialState({
    errors: null,
    loading: false,
    student: null,
  }
)
