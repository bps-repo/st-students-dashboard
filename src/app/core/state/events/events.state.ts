import { Event, EventsPage } from "../../models/Event";

/**
 * Events state interface
 */
export interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial events state
 */
export const initialEventsState: EventsState = {
  events: [],
  selectedEvent: null,
  currentPage: 0,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
};
