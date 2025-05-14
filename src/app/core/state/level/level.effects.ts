import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {StudentService} from "../../services/student-service";
import {LevelActions} from "./levelActions";
import {exhaustMap, map, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {UnitsActions} from "../units/units.actions";
import {AuthActions} from "../auth/authActions";
import {LevelService} from "../../services/level-service";

@Injectable()
export class LevelEffects {
  actions$ = inject(Actions)
  store$ = inject(Store)
  levelService = inject(LevelService)

  loadStudentLevel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadStudentLevel),
      exhaustMap(() =>
        this.levelService.getLevelById().pipe(
          map((level) => LevelActions.loadStudentLevelSuccess({levelStudent: level})),
          catchError((e) => of(LevelActions.loadStudentLevelFailure({errors: e})))
        )
      )
    )
  })

  loadStudentLevelSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadStudentLevelSuccess),
      tap(() => {
        // any action
      })
    )
  }, {dispatch: false})


  loadStudentLevelFailure = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadStudentLevelFailure),
      tap(() => {
        //any action
      })
    )
  }, {dispatch: false})


  loadLevels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadLevels),
      exhaustMap(() =>
        this.levelService.getLevels().pipe(
          map((levels) => LevelActions.loadLevelsSuccess({levels})),
          catchError((e) => of(LevelActions.loadLevelsFailed({errors: e})))
        )
      )
    )
  })
}
