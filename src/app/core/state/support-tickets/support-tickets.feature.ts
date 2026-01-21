import { createFeature, createReducer, on } from '@ngrx/store';
import { initialSupportTicketsState, supportTicketsAdapter } from './support-tickets.state';
import { SUPPORT_TICKETS_FEATURE_KEY, SupportTicketsActions } from "./support-tickets.actions";

export const supportTicketsFeature = createFeature(
  {
    name: SUPPORT_TICKETS_FEATURE_KEY,
    reducer: createReducer(
      initialSupportTicketsState,
      // Load Support Tickets
      on(SupportTicketsActions.loadSupportTickets, (state, { filters }) => ({
        ...state,
        isLoading: true,
        error: null,
        filters: filters || {},
      })),

      on(SupportTicketsActions.loadSupportTicketsSuccess, (state, { tickets }) =>
        supportTicketsAdapter.setAll(tickets, {
          ...state,
          isLoading: false,
          error: null,
        })
      ),

      on(SupportTicketsActions.loadSupportTicketsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Create Support Ticket
      on(SupportTicketsActions.createSupportTicket, (state) => ({
        ...state,
        isSubmitting: true,
        error: null,
      })),

      on(SupportTicketsActions.createSupportTicketSuccess, (state, { ticket }) =>
        supportTicketsAdapter.addOne(ticket, {
          ...state,
          isSubmitting: false,
          error: null,
        })
      ),

      on(SupportTicketsActions.createSupportTicketFailure, (state, { error }) => ({
        ...state,
        isSubmitting: false,
        error,
      })),

      // Load Single Support Ticket
      on(SupportTicketsActions.loadSupportTicket, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),

      on(SupportTicketsActions.loadSupportTicketSuccess, (state, { ticket }) =>
        supportTicketsAdapter.upsertOne(ticket, {
          ...state,
          isLoading: false,
          error: null,
        })
      ),

      on(SupportTicketsActions.loadSupportTicketFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
      })),

      // Update Support Ticket
      on(SupportTicketsActions.updateSupportTicket, (state) => ({
        ...state,
        isSubmitting: true,
        error: null,
      })),

      on(SupportTicketsActions.updateSupportTicketSuccess, (state, { ticket }) =>
        supportTicketsAdapter.upsertOne(ticket, {
          ...state,
          isSubmitting: false,
          error: null,
        })
      ),

      on(SupportTicketsActions.updateSupportTicketFailure, (state, { error }) => ({
        ...state,
        isSubmitting: false,
        error,
      })),

      // Select Ticket
      on(SupportTicketsActions.selectTicket, (state, { ticketId }) => ({
        ...state,
        selectedTicketId: ticketId,
      })),

      // Clear Selection
      on(SupportTicketsActions.clearSelection, (state) => ({
        ...state,
        selectedTicketId: null,
      })),

      // Clear Support Tickets
      on(SupportTicketsActions.clearSupportTickets, () => ({
        ...initialSupportTicketsState
      }))
    )
  }
);
