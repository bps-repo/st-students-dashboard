import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Meeting, CreateMeetingPayload, MeetingStatus} from "../../models/Meeting";

export const MEETINGS_FEATURE_KEY = 'meetings';

export const MeetingsActions = createActionGroup({
  source: MEETINGS_FEATURE_KEY,
  events: {
    // Load meetings with filters
    loadMeetings: props<{ filters?: { studentId?: string; employeeId?: string; status?: string; startAt?: string; endAt?: string } }>(),
    loadMeetingsSuccess: props<{ meetings: Meeting[] }>(),
    loadMeetingsFailure: props<{ error: any }>(),

    // Create meeting
    createMeeting: props<{ meeting: CreateMeetingPayload }>(),
    createMeetingSuccess: props<{ meeting: Meeting }>(),
    createMeetingFailure: props<{ error: any }>(),

    // Load a single meeting
    loadMeeting: props<{ meetingId: string }>(),
    loadMeetingSuccess: props<{ meeting: Meeting }>(),
    loadMeetingFailure: props<{ error: any }>(),

    // Update meeting
    updateMeeting: props<{ meetingId: string; meeting: Partial<Meeting> }>(),
    updateMeetingSuccess: props<{ meeting: Meeting }>(),
    updateMeetingFailure: props<{ error: any }>(),

    // Cancel meeting
    cancelMeeting: props<{ meetingId: string }>(),
    cancelMeetingSuccess: props<{ meeting: Meeting }>(),
    cancelMeetingFailure: props<{ error: any }>(),

    // Select a meeting
    selectMeeting: props<{ meetingId: string }>(),

    // Clear selected meeting
    clearSelection: emptyProps(),

    // Clear meetings state
    clearMeetings: emptyProps(),
  }
})
