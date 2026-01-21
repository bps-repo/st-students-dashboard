import {createFeatureSelector, createSelector} from "@ngrx/store";
import {supportTicketsAdapter, SupportTicketsState} from "./support-tickets.state";
import {SUPPORT_TICKETS_FEATURE_KEY} from "./support-tickets.actions";

const selectSupportTicketsState = createFeatureSelector<SupportTicketsState>(SUPPORT_TICKETS_FEATURE_KEY);

export const SupportTicketsSelectors = {
  selectSupportTicketsLoading: createSelector(selectSupportTicketsState, state => state.isLoading),
  selectSupportTicketsError: createSelector(selectSupportTicketsState, state => state.error),
  selectIsSubmitting: createSelector(selectSupportTicketsState, state => state.isSubmitting),
  selectFilters: createSelector(selectSupportTicketsState, state => state.filters),
  selectSelectedTicketId: createSelector(selectSupportTicketsState, state => state.selectedTicketId),
}

/**
 * Entity selectors from the adapter
 */
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = supportTicketsAdapter.getSelectors(selectSupportTicketsState);

export const SupportTicketsEntitySelectors = {
  selectSupportTicketIds: selectIds,
  selectSupportTicketEntities: selectEntities,
  selectAllSupportTickets: selectAll,
  selectTotalSupportTickets: selectTotal,
  selectSupportTicketById: (ticketId: string) => createSelector(selectEntities, entities => entities[ticketId]),
};
