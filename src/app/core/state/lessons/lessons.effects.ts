import {LessonService} from "../../services/lesson-service";


import {Actions, createEffect, ofType} from '@ngrx/effects';


import {LessonsActions} from './lessons.actions';

import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {inject, Injectable} from "@angular/core";

@Injectable()
export class LessonsEffects {
  actions$ = inject(Actions);

  constructor(
    private lessonsService: LessonService
  ) {
  }

  /**
   * Load lessons effect
   */
  loadLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonsActions.loadLessons),
      switchMap(({status}) =>
        this.lessonsService.getLessons(status).pipe(
          map((lessons) =>
            LessonsActions.loadLessonsSuccess({lessons})
          ),
          catchError((error) =>
            of(LessonsActions.loadLessonsFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Load lesson history effect
   */
  loadLessonHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonsActions.loadLessonHistory),
      switchMap(({status, startDate, endDate}) =>
        this.lessonsService.getLessonHistory(status, startDate, endDate).pipe(
          map((lessons) =>
            LessonsActions.loadLessonHistorySuccess({lessons})
          ),
          catchError((error) =>
            of(LessonsActions.loadLessonHistoryFailure({error}))
          )
        )
      )
    )
  );


  /**
   * Clear lessons effect
   */
  clearLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonsActions.clearLessons),
      map(() => LessonsActions.clearSelection())
    )
  );

  /**
   * Clear selection effect
   */
  clearSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonsActions.clearSelection),
      map(() => LessonsActions.clearLessons())
    )
  );

  /**
   * Select lesson effect
   */
  selectLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonsActions.selectLesson),
      map(({lessonId}) => LessonsActions.loadLesson({lessonId}))
    )
  );

  /**
   * Clear selected lesson effect
   */
  clearSelectedLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonsActions.clearSelection),
      map(() => LessonsActions.clearLessons())
    )
  );
}
