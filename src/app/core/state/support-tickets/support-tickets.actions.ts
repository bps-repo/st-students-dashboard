import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {SupportTicket, SupportTicketFilters, SupportTicketPriority, SupportTicketStatus} from "../../models/SupportTicket";

export const SUPPORT_TICKETS_FEATURE_KEY = 'supportTickets';

export const SupportTicketsActions = createActionGroup({
  source: SUPPORT_TICKETS_FEATURE_KEY,
  events: {
    // Load support tickets with filters
    loadSupportTickets: props<{ filters?: SupportTicketFilters }>(),
    loadSupportTicketsSuccess: props<{ tickets: SupportTicket[] }>(),
    loadSupportTicketsFailure: props<{ error: any }>(),

    // Create support ticket
    createSupportTicket: props<{ ticket: Partial<SupportTicket> }>(),
    createSupportTicketSuccess: props<{ ticket: SupportTicket }>(),
    createSupportTicketFailure: props<{ error: any }>(),

    // Load a single support ticket
    loadSupportTicket: props<{ ticketId: string }>(),
    loadSupportTicketSuccess: props<{ ticket: SupportTicket }>(),
    loadSupportTicketFailure: props<{ error: any }>(),

    // Update support ticket
    updateSupportTicket: props<{ ticketId: string; ticket: Partial<SupportTicket> }>(),
    updateSupportTicketSuccess: props<{ ticket: SupportTicket }>(),
    updateSupportTicketFailure: props<{ error: any }>(),

    // Select a ticket
    selectTicket: props<{ ticketId: string }>(),

    // Clear selected ticket
    clearSelection: emptyProps(),

    // Clear support tickets state
    clearSupportTickets: emptyProps(),
  }
})
