import {createFeatureSelector, createSelector} from "@ngrx/store";
import {meetingsAdapter, MeetingsState} from "./meetings.state";
import {MEETINGS_FEATURE_KEY} from "./meetings.actions";

const selectMeetingsState = createFeatureSelector<MeetingsState>(MEETINGS_FEATURE_KEY);

export const MeetingsSelectors = {
  selectMeetingsLoading: createSelector(selectMeetingsState, state => state.isLoading),
  selectMeetingsError: createSelector(selectMeetingsState, state => state.error),
  selectIsSubmitting: createSelector(selectMeetingsState, state => state.isSubmitting),
  selectSelectedMeetingId: createSelector(selectMeetingsState, state => state.selectedMeetingId),
}

/**
 * Entity selectors from the adapter
 */
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = meetingsAdapter.getSelectors(selectMeetingsState);

export const MeetingsEntitySelectors = {
  selectMeetingIds: selectIds,
  selectMeetingEntities: selectEntities,
  selectAllMeetings: selectAll,
  selectTotalMeetings: selectTotal,
  selectMeetingById: (meetingId: string) => createSelector(selectEntities, entities => entities[meetingId]),
};
