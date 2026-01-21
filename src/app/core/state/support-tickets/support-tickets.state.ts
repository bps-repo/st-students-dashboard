import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {SupportTicket, SupportTicketFilters} from "../../models/SupportTicket";

/**
 * Support tickets state interface using entity adapter for normalized state
 */
export interface SupportTicketsState extends EntityState<SupportTicket> {
  selectedTicketId: string | null;
  isLoading: boolean;
  error: string | null;
  filters: SupportTicketFilters;
  isSubmitting: boolean;
}

/**
 * Entity adapter for support tickets
 */
export const supportTicketsAdapter: EntityAdapter<SupportTicket> = createEntityAdapter<SupportTicket>({
  // Use id as the ID
  selectId: (ticket: SupportTicket) => ticket.id,
  // Sort by createdAt descending (newest first)
  sortComparer: (a: SupportTicket, b: SupportTicket) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

/**
 * Initial support tickets state
 */
export const initialSupportTicketsState: SupportTicketsState = supportTicketsAdapter.getInitialState({
  selectedTicketId: null,
  isLoading: false,
  error: null,
  filters: {},
  isSubmitting: false,
});
