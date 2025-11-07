import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { LessonMaterialsActions } from './lesson-materials.actions';
import { LessonMaterialService } from '../../services/lesson-material.service';

@Injectable()
export class LessonMaterialsEffects {
  actions$ = inject(Actions);

  constructor(
    private lessonMaterialService: LessonMaterialService
  ) {}

  /**
   * Load lesson materials effect
   */
  loadLessonMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonMaterialsActions.loadLessonMaterials),
      switchMap(({ lessonId }) =>
        this.lessonMaterialService.getLessonMaterials(lessonId).pipe(
          map((materials) =>
            LessonMaterialsActions.loadLessonMaterialsSuccess({ lessonId, materials })
          ),
          catchError((error) =>
            of(LessonMaterialsActions.loadLessonMaterialsFailure({ lessonId, error }))
          )
        )
      )
    )
  );
}
