import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsState } from './events.state';

const selectEvents = createFeatureSelector<EventsState>('events');

export const EventsSelectors = {
  events: createSelector(
    selectEvents,
    (state: EventsState) => state.events
  ),
  selectedEvent: createSelector(
    selectEvents,
    (state: EventsState) => state.selectedEvent
  ),
  loading: createSelector(
    selectEvents,
    (state: EventsState) => state.isLoading
  ),
  error: createSelector(
    selectEvents,
    (state: EventsState) => state.error
  ),
  currentPage: createSelector(
    selectEvents,
    (state: EventsState) => state.currentPage
  ),
  pageSize: createSelector(
    selectEvents,
    (state: EventsState) => state.pageSize
  ),
  totalElements: createSelector(
    selectEvents,
    (state: EventsState) => state.totalElements
  ),
  totalPages: createSelector(
    selectEvents,
    (state: EventsState) => state.totalPages
  ),
  hasEvents: createSelector(
    selectEvents,
    (state: EventsState) => state.events.length > 0
  ),
  eventsCount: createSelector(
    selectEvents,
    (state: EventsState) => state.events.length
  ),
  upcomingEvents: createSelector(
    selectEvents,
    (state: EventsState) => {
      const now = new Date();
      return state.events.filter(
        (event) => new Date(event.startAt) > now
      );
    }
  ),
  pastEvents: createSelector(
    selectEvents,
    (state: EventsState) => {
      const now = new Date();
      return state.events.filter(
        (event) => new Date(event.endAt) < now
      );
    }
  ),
  onlineEvents: createSelector(
    selectEvents,
    (state: EventsState) => state.events.filter((event) => event.online)
  ),
  inPersonEvents: createSelector(
    selectEvents,
    (state: EventsState) => state.events.filter((event) => !event.online)
  ),
};
