import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import {NotificationService} from '../../services/notification.service';
import {NotificationsActions} from './notifications.actions';

@Injectable()
export class NotificationsEffects {
  private readonly actions$ = inject(Actions);
  private readonly notificationService = inject(NotificationService);

  /**
   * Load notifications effect
   */
  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.loadNotifications),
      exhaustMap(() =>
        this.notificationService.getNotifications().pipe(
          map(notifications => NotificationsActions.loadNotificationsSuccess({notifications})),
          catchError(error =>
            of(NotificationsActions.loadNotificationsFailure({
              error: error.message || 'Failed to load notifications'
            }))
          )
        )
      )
    )
  );

  /**
   * Mark notification as read effect
   */
  markAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.markAsRead),
      exhaustMap(({notificationId}) =>
        this.notificationService.markAsRead(notificationId).pipe(
          map(() => NotificationsActions.markAsReadSuccess({notificationId})),
          catchError(error =>
            of(NotificationsActions.markAsReadFailure({
              error: error.message || 'Failed to mark notification as read'
            }))
          )
        )
      )
    )
  );

  /**
   * Mark all notifications as read effect
   */
  markAllAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.markAllAsRead),
      exhaustMap(() =>
        this.notificationService.markAllAsRead().pipe(
          map(() => NotificationsActions.markAllAsReadSuccess()),
          catchError(error =>
            of(NotificationsActions.markAllAsReadFailure({
              error: error.message || 'Failed to mark all notifications as read'
            }))
          )
        )
      )
    )
  );
}

