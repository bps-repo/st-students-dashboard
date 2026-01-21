import { createFeature, createReducer, on } from '@ngrx/store';
import { initialMeetingsState, meetingsAdapter } from './meetings.state';
import { MEETINGS_FEATURE_KEY, MeetingsActions } from "./meetings.actions";

export const meetingsFeature = createFeature(
  {
    name: MEETINGS_FEATURE_KEY,
    reducer: createReducer(
      initialMeetingsState,
      // Load Meetings
      on(MeetingsActions.loadMeetings, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(MeetingsActions.loadMeetingsSuccess, (state, { meetings }) =>
        meetingsAdapter.setAll(meetings, {
          ...state,
          isLoading: false,
          error: null,
        })
      ),

      on(MeetingsActions.loadMeetingsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Create Meeting
      on(MeetingsActions.createMeeting, (state) => ({
        ...state,
        isSubmitting: true,
        error: null,
      })),

      on(MeetingsActions.createMeetingSuccess, (state, { meeting }) =>
        meetingsAdapter.addOne(meeting, {
          ...state,
          isSubmitting: false,
          error: null,
        })
      ),

      on(MeetingsActions.createMeetingFailure, (state, { error }) => ({
        ...state,
        isSubmitting: false,
        error,
      })),

      // Load Single Meeting
      on(MeetingsActions.loadMeeting, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(MeetingsActions.loadMeetingSuccess, (state, { meeting }) =>
        meetingsAdapter.upsertOne(meeting, {
          ...state,
          isLoading: false,
          error: null,
        })
      ),

      on(MeetingsActions.loadMeetingFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Update Meeting
      on(MeetingsActions.updateMeeting, (state) => ({
        ...state,
        isSubmitting: true,
        error: null,
      })),

      on(MeetingsActions.updateMeetingSuccess, (state, { meeting }) =>
        meetingsAdapter.upsertOne(meeting, {
          ...state,
          isSubmitting: false,
          error: null,
        })
      ),

      on(MeetingsActions.updateMeetingFailure, (state, { error }) => ({
        ...state,
        isSubmitting: false,
        error,
      })),

      // Cancel Meeting
      on(MeetingsActions.cancelMeeting, (state) => ({
        ...state,
        isSubmitting: true,
        error: null,
      })),

      on(MeetingsActions.cancelMeetingSuccess, (state, { meeting }) =>
        meetingsAdapter.upsertOne(meeting, {
          ...state,
          isSubmitting: false,
          error: null,
        })
      ),

      on(MeetingsActions.cancelMeetingFailure, (state, { error }) => ({
        ...state,
        isSubmitting: false,
        error,
      })),

      // Select Meeting
      on(MeetingsActions.selectMeeting, (state, { meetingId }) => ({
        ...state,
        selectedMeetingId: meetingId,
      })),

      // Clear Selection
      on(MeetingsActions.clearSelection, (state) => ({
        ...state,
        selectedMeetingId: null,
      })),

      // Clear Meetings
      on(MeetingsActions.clearMeetings, () => ({
        ...initialMeetingsState
      }))
    )
  }
);
