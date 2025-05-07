import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {StudentService} from "../../services/student-service";
import {StudentActions} from "./studentActions";
import {exhaustMap, map, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {UnitsActions} from "../units/units.actions";

@Injectable()
export class StudentEffects {
  action$ = inject(Actions)
  store$ = inject(Store)
  studentService = inject(StudentService)

  loadStudent$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.loadStudent),
      exhaustMap(() =>
        this.studentService.getStudentByEmail().pipe(
          map((student) => StudentActions.loadStudentSuccess({student})),
          catchError((e) => of(StudentActions.loadStudentFailure({errors: e})))
        )
      )
    )
  })

  loadStudentSuccess = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.loadStudentSuccess),
      tap(() => {
        this.store$.dispatch(UnitsActions.loadUnits())
      })
    )
  }, {dispatch: false})
}
