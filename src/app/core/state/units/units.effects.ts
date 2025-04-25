import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UnityService } from '../../services/unity.service';
import { AlertService } from '../../services/alert.service';
import * as UnitsActions from './units.actions';

@Injectable()
export class UnitsEffects {
  constructor(
    private actions$: Actions,
    private unityService: UnityService,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Load units effect
   */
  loadUnits$ = createEffect(() => {
    // Skip effects on server side
    if (!isPlatformBrowser(this.platformId)) {
      return of({ type: '[Units] SSR Skip' });
    }

    // Ensure actions$ is defined before accessing pipe
    if (!this.actions$) {
      console.error('Actions$ is undefined in UnitsEffects');
      return of(UnitsActions.loadUnitsFailure({ error: 'Actions$ is undefined' }));
    }

    return this.actions$.pipe(
      ofType(UnitsActions.loadUnits),
      exhaustMap(() =>
        this.unityService.getUnities().pipe(
          map((units) => {
            return UnitsActions.loadUnitsSuccess({ units });
          }),
          catchError((error) => {
            this.alertService.error('Failed to load units');
            return of(UnitsActions.loadUnitsFailure({ error: error.message }));
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
    // Skip effects on server side
    if (!isPlatformBrowser(this.platformId)) {
      return of({ type: '[Units] SSR Skip' });
    }

    // Ensure actions$ is defined before accessing pipe
    if (!this.actions$) {
      console.error('Actions$ is undefined in UnitsEffects');
      return of(UnitsActions.updateUnitStatusFailure({ error: 'Actions$ is undefined' }));
    }

    return this.actions$.pipe(
      ofType(UnitsActions.updateUnitStatus),
      exhaustMap(({ unitId, status }) =>
        // This would normally call a service method to update the unit status
        // For now, we'll just simulate a successful update
        of({ title: unitId, status }).pipe(
          map((unit) => {
            this.alertService.success(`Unit status updated to ${status}`);
            return UnitsActions.updateUnitStatusSuccess({ unit: unit as any });
          }),
          catchError((error) => {
            this.alertService.error('Failed to update unit status');
            return of(UnitsActions.updateUnitStatusFailure({ error: error.message }));
          })
        )
      )
    );
  });
}
