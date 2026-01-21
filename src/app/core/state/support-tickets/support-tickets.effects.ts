import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SupportTicketsActions} from './support-tickets.actions';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {SupportTicketService} from "../../services/support-ticket.service";
import {SupportTicketsSelectors} from "./support-tickets.selectors";

@Injectable()
export class SupportTicketsEffects {
  actions$ = inject(Actions);
  store$ = inject(Store);

  constructor(
    private supportTicketService: SupportTicketService
  ) {
  }

  /**
   * Load support tickets effect
   */
  loadSupportTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.loadSupportTickets),
      switchMap(({filters}) =>
        this.supportTicketService.getSupportTickets(filters).pipe(
          map((tickets) =>
            SupportTicketsActions.loadSupportTicketsSuccess({tickets})
          ),
          catchError((error) =>
            of(SupportTicketsActions.loadSupportTicketsFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Create support ticket effect
   */
  createSupportTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.createSupportTicket),
      switchMap(({ticket}) =>
        this.supportTicketService.createSupportTicket(ticket).pipe(
          map((createdTicket) =>
            SupportTicketsActions.createSupportTicketSuccess({ticket: createdTicket})
          ),
          catchError((error) =>
            of(SupportTicketsActions.createSupportTicketFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Load single support ticket effect
   */
  loadSupportTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.loadSupportTicket),
      switchMap(({ticketId}) =>
        this.supportTicketService.getSupportTicketById(ticketId).pipe(
          map((ticket) =>
            SupportTicketsActions.loadSupportTicketSuccess({ticket})
          ),
          catchError((error) =>
            of(SupportTicketsActions.loadSupportTicketFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Update support ticket effect
   */
  updateSupportTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.updateSupportTicket),
      switchMap(({ticketId, ticket}) =>
        this.supportTicketService.updateSupportTicket(ticketId, ticket).pipe(
          map((updatedTicket) =>
            SupportTicketsActions.updateSupportTicketSuccess({ticket: updatedTicket})
          ),
          catchError((error) =>
            of(SupportTicketsActions.updateSupportTicketFailure({error}))
          )
        )
      )
    )
  );

  /**
   * Reload tickets after successful creation
   */
  reloadTicketsAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupportTicketsActions.createSupportTicketSuccess),
      withLatestFrom(this.store$.select(SupportTicketsSelectors.selectFilters)),
      map(([action, filters]) => {
        // Reload tickets with current filters
        return SupportTicketsActions.loadSupportTickets({filters: filters || {}});
      })
    )
  );
}
