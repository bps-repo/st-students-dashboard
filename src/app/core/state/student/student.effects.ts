import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {of} from "rxjs";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";

import {StudentService} from "../../services/student-service";
import {StudentActions} from "./studentActions";
import {UnitsActions} from "../units/units.actions";
import {AuthActions} from "../auth/authActions";
import {LevelActions} from "../level/levelActions";

@Injectable()
export class StudentEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly studentService = inject(StudentService);

  /**
   * Load student information effect
   */
  loadStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudent),
      exhaustMap(() =>
        this.studentService.getStudentMyProfile().pipe(
          map(student => StudentActions.loadStudentSuccess({student})),
          catchError(error => of(StudentActions.loadStudentFailure({
            errors: error.message || 'Failed to load student information'
          })))
        )
      )
    )
  );

  /**
   * Load student success effect - Load related data
   */
  loadStudentSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentActions.loadStudentSuccess),
        tap(() => {
          // Load related data when student is successfully loaded
          this.store.dispatch(UnitsActions.loadUnits());
          this.store.dispatch(LevelActions.loadStudentLevel());
        })
      ),
    {dispatch: false}
  );

  /**
   * Load student failure effect - Logout on failure
   */
  loadStudentFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentActions.loadStudentFailure),
        tap(({errors}) => {
          console.error('Failed to load student:', errors);
          // Logout if we can't load student information
          this.store.dispatch(AuthActions.logout());
        })
      ),
    {dispatch: false}
  );
}
