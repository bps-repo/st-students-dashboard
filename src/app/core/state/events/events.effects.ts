import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { EventsActions } from './events.actions';

@Injectable()
export class EventsEffects {
  private actions$ = inject(Actions);
  private eventService = inject(EventService);

  /**
   * Effect to load events with pagination
   */
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadEvents),
      switchMap(({ page = 0, size = 10 }) =>
        this.eventService.getEvents(page, size).pipe(
          map((eventsPage) =>
            EventsActions.loadEventsSuccess({ eventsPage })
          ),
          catchError((error) =>
            of(
              EventsActions.loadEventsFailure({
                error: error.message || 'Failed to load events',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to load a specific event by ID
   */
  loadEventById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadEventById),
      switchMap(({ eventId }) =>
        this.eventService.getEventById(eventId).pipe(
          map((event) =>
            EventsActions.loadEventByIdSuccess({ event })
          ),
          catchError((error) =>
            of(
              EventsActions.loadEventByIdFailure({
                error: error.message || 'Failed to load event',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to register for an event
   */
  registerForEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.registerForEvent),
      switchMap(({ eventId, studentId }) =>
        this.eventService.registerForEvent(eventId, studentId).pipe(
          map(() =>
            EventsActions.registerForEventSuccess({ eventId })
          ),
          catchError((error) =>
            of(
              EventsActions.registerForEventFailure({
                error: error.message || 'Failed to register for event',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to cancel registration
   */
  cancelRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.cancelRegistration),
      switchMap(({ eventId, studentId }) =>
        this.eventService.cancelRegistration(eventId, studentId).pipe(
          map(() =>
            EventsActions.cancelRegistrationSuccess({ eventId })
          ),
          catchError((error) =>
            of(
              EventsActions.cancelRegistrationFailure({
                error: error.message || 'Failed to cancel registration',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to load upcoming events
   */
  loadUpcomingEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadUpcomingEvents),
      switchMap(({ page = 0, size = 10 }) =>
        this.eventService.getUpcomingEvents(page, size).pipe(
          map((eventsPage) =>
            EventsActions.loadUpcomingEventsSuccess({ eventsPage })
          ),
          catchError((error) =>
            of(
              EventsActions.loadUpcomingEventsFailure({
                error: error.message || 'Failed to load upcoming events',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to reload events after successful registration
   */
  reloadAfterRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.registerForEventSuccess),
      map(() => EventsActions.loadEvents({ page: 0, size: 10 }))
    )
  );

  /**
   * Effect to reload events after successful cancellation
   */
  reloadAfterCancellation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.cancelRegistrationSuccess),
      map(() => EventsActions.loadEvents({ page: 0, size: 10 }))
    )
  );
}
