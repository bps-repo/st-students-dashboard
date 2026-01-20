import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Event, EventsPage } from '../../models/Event';

/**
 * Events Actions
 */
export const eventsFeatureKey = 'events';

export const EventsActions = createActionGroup({
  source: eventsFeatureKey,
  events: {
    // Load Events
    'Load Events': props<{ page?: number; size?: number }>(),
    'Load Events Success': props<{ eventsPage: EventsPage }>(),
    'Load Events Failure': props<{ error: string }>(),

    // Load Event By ID
    'Load Event By Id': props<{ eventId: string }>(),
    'Load Event By Id Success': props<{ event: Event }>(),
    'Load Event By Id Failure': props<{ error: string }>(),

    // Select Event
    'Select Event': props<{ event: Event }>(),
    'Clear Selected Event': emptyProps(),

    // Register for Event
    'Register For Event': props<{ eventId: string; studentId: string }>(),
    'Register For Event Success': props<{ eventId: string }>(),
    'Register For Event Failure': props<{ error: string }>(),

    // Cancel Registration
    'Cancel Registration': props<{ eventId: string; studentId: string }>(),
    'Cancel Registration Success': props<{ eventId: string }>(),
    'Cancel Registration Failure': props<{ error: string }>(),

    // Load Upcoming Events
    'Load Upcoming Events': props<{ page?: number; size?: number }>(),
    'Load Upcoming Events Success': props<{ eventsPage: EventsPage }>(),
    'Load Upcoming Events Failure': props<{ error: string }>(),

    // Pagination
    'Set Page': props<{ page: number }>(),
    'Set Page Size': props<{ size: number }>(),

    // Clear state
    'Clear Error': emptyProps(),
    'Clear Events': emptyProps(),
  },
});
