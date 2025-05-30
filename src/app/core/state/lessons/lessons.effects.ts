import {LessonService} from "../../services/lesson-service";


import {Actions, createEffect, ofType} from '@ngrx/effects';


import {LessonsActions} from './lessons.actions';

import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LessonSchedule} from '../../models/LessonSchedule';
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
      switchMap(() =>
        this.lessonsService.getLessons().pipe(
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
