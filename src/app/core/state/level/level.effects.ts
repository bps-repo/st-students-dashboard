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

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadLevel),
      exhaustMap(() =>
        this.levelService.getLevelById().pipe(
          map((level) => LevelActions.loadLevelSuccess({level})),
          catchError((e) => of(LevelActions.loadLevelFailure({errors: e})))
        )
      )
    )
  })

  loadStudentSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadLevelSuccess),
      tap(() => {
        // any action
      })
    )
  }, {dispatch: false})


  loadStudentFailure = createEffect(() => {
    return this.actions$.pipe(
      ofType(LevelActions.loadLevelFailure),
      tap(() => {
        //any action
      })
    )
  }, {dispatch: false})
}
