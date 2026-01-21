import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Meeting} from "../../models/Meeting";

/**
 * Meetings state interface using entity adapter for normalized state
 */
export interface MeetingsState extends EntityState<Meeting> {
  selectedMeetingId: string | null;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

/**
 * Entity adapter for meetings
 */
export const meetingsAdapter: EntityAdapter<Meeting> = createEntityAdapter<Meeting>({
  // Use id as the ID, generate a temporary ID if not present
  selectId: (meeting: Meeting) => meeting.id || `temp-${Date.now()}-${Math.random()}`,
  // Sort by startAt descending (newest first)
  sortComparer: (a: Meeting, b: Meeting) =>
    new Date(b.startAt).getTime() - new Date(a.startAt).getTime(),
});

/**
 * Initial meetings state
 */
export const initialMeetingsState: MeetingsState = meetingsAdapter.getInitialState({
  selectedMeetingId: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
});
