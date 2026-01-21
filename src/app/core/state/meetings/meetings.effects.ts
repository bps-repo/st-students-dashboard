import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MeetingsActions} from './meetings.actions';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {MeetingService} from "../../services/meeting.service";
import {MeetingsSelectors} from "./meetings.selectors";

@Injectable()
export class MeetingsEffects {
  actions$ = inject(Actions);
  store$ = inject(Store);

  constructor(
    private meetingService: MeetingService
  ) {
  }

  /**
   * Load meetings effect
   */
  loadMeetings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.loadMeetings),
      switchMap(({filters}) =>
        this.meetingService.getMeetings(filters).pipe(
          map((meetings) =>
            MeetingsActions.loadMeetingsSuccess({meetings})
          ),
          catchError((error) =>
            of(MeetingsActions.loadMeetingsFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Create meeting effect
   */
  createMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.createMeeting),
      switchMap(({meeting}) =>
        this.meetingService.createMeeting(meeting).pipe(
          map((createdMeeting) =>
            MeetingsActions.createMeetingSuccess({meeting: createdMeeting})
          ),
          catchError((error) =>
            of(MeetingsActions.createMeetingFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Load single meeting effect
   */
  loadMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.loadMeeting),
      switchMap(({meetingId}) =>
        this.meetingService.getMeetingById(meetingId).pipe(
          map((meeting) =>
            MeetingsActions.loadMeetingSuccess({meeting})
          ),
          catchError((error) =>
            of(MeetingsActions.loadMeetingFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Update meeting effect
   */
  updateMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.updateMeeting),
      switchMap(({meetingId, meeting}) =>
        this.meetingService.updateMeeting(meetingId, meeting).pipe(
          map((updatedMeeting) =>
            MeetingsActions.updateMeetingSuccess({meeting: updatedMeeting})
          ),
          catchError((error) =>
            of(MeetingsActions.updateMeetingFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Cancel meeting effect
   */
  cancelMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.cancelMeeting),
      switchMap(({meetingId}) =>
        this.meetingService.cancelMeeting(meetingId).pipe(
          map((cancelledMeeting) =>
            MeetingsActions.cancelMeetingSuccess({meeting: cancelledMeeting})
          ),
          catchError((error) =>
            of(MeetingsActions.cancelMeetingFailure({error}))
          )
        )
      )
    )
  );
}
