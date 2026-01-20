import { createFeature, createReducer, on } from '@ngrx/store';
import { initialEventsState } from './events.state';
import { EventsActions, eventsFeatureKey } from './events.actions';

export const eventsFeature = createFeature({
  name: eventsFeatureKey,
  reducer: createReducer(
    initialEventsState,
    // Load Events
    on(EventsActions.loadEvents, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(EventsActions.loadEventsSuccess, (state, { eventsPage }) => ({
      ...state,
      // Append events if loading next page, replace if first page
      events: eventsPage.number === 0 
        ? eventsPage.content 
        : [...state.events, ...eventsPage.content],
      currentPage: eventsPage.number,
      pageSize: eventsPage.size,
      totalElements: eventsPage.totalElements,
      totalPages: eventsPage.totalPages,
      isLoading: false,
      error: null,
    })),

    on(EventsActions.loadEventsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Load Event By ID
    on(EventsActions.loadEventById, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(EventsActions.loadEventByIdSuccess, (state, { event }) => ({
      ...state,
      selectedEvent: event,
      isLoading: false,
      error: null,
    })),

    on(EventsActions.loadEventByIdFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Select Event
    on(EventsActions.selectEvent, (state, { event }) => ({
      ...state,
      selectedEvent: event,
    })),

    on(EventsActions.clearSelectedEvent, (state) => ({
      ...state,
      selectedEvent: null,
    })),

    // Register for Event
    on(EventsActions.registerForEvent, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(EventsActions.registerForEventSuccess, (state, { eventId }) => ({
      ...state,
      events: state.events.map((event) =>
        event.id === eventId
          ? { ...event, /* Update participation */ }
          : event
      ),
      isLoading: false,
      error: null,
    })),

    on(EventsActions.registerForEventFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Cancel Registration
    on(EventsActions.cancelRegistration, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(EventsActions.cancelRegistrationSuccess, (state, { eventId }) => ({
      ...state,
      events: state.events.map((event) =>
        event.id === eventId
          ? { ...event, /* Update participation */ }
          : event
      ),
      isLoading: false,
      error: null,
    })),

    on(EventsActions.cancelRegistrationFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Load Upcoming Events
    on(EventsActions.loadUpcomingEvents, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(EventsActions.loadUpcomingEventsSuccess, (state, { eventsPage }) => ({
      ...state,
      events: eventsPage.content,
      currentPage: eventsPage.number,
      pageSize: eventsPage.size,
      totalElements: eventsPage.totalElements,
      totalPages: eventsPage.totalPages,
      isLoading: false,
      error: null,
    })),

    on(EventsActions.loadUpcomingEventsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Pagination
    on(EventsActions.setPage, (state, { page }) => ({
      ...state,
      currentPage: page,
    })),

    on(EventsActions.setPageSize, (state, { size }) => ({
      ...state,
      pageSize: size,
    })),

    // Clear state
    on(EventsActions.clearError, (state) => ({
      ...state,
      error: null,
    })),

    on(EventsActions.clearEvents, () => initialEventsState)
  ),
});
