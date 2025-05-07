import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {UnityService} from '../../services/unity.service';
import {AlertService} from '../../services/alert.service';
import {UnitsActions} from './units.actions';

@Injectable()
export class UnitsEffects {
  actions$ = inject(Actions)
  unityService = inject(UnityService)
  alertService = inject(AlertService)

  /**
   * Load un  its effect
   */
  loadUnits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitsActions.loadUnits),
      exhaustMap(() =>
        this.unityService.getUnitsByLevelId().pipe(
          map((units) => {
            return UnitsActions.loadUnitsSuccess({units});
          }),
          catchError((error) => {
            return of(UnitsActions.loadUnitsFailure({error: error.message}));
          })
        )
      )
    );
  });

  /**
   * Update unit status effect
   * Note: This is a mock implementation since we don't have a real API for this
   */
  updateUnitStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitsActions.updateUnitStatus),
      exhaustMap(({unitId, status}) =>
        // This would normally call a service method to update the unit status
        // For now, we'll just simulate a successful update
        of({title: unitId, status}).pipe(
          map((unit) => {
            this.alertService.success(`Unit status updated to ${status}`);
            return UnitsActions.updateUnitStatusSuccess({unit: unit as any});
          }),
          catchError((error) => {
            this.alertService.error('Failed to update unit status');
            return of(UnitsActions.updateUnitStatusFailure({error: error.message}));
          })
        )
      )
    );
  });
}
