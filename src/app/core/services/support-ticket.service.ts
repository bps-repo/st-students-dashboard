import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { SupportTicket, SupportTicketFilters } from '../models/SupportTicket';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {
  private baseUrl = `${environment.apiUrl}/support-tickets`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get support tickets with optional filters
   * @param filters Optional filters for requesterId, assignedToId, and status
   * @returns Observable of SupportTicket array
   */
  getSupportTickets(filters?: SupportTicketFilters): Observable<SupportTicket[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.requesterId) {
        params = params.set('requesterId', filters.requesterId);
      }
      if (filters.assignedToId) {
        params = params.set('assignedToId', filters.assignedToId);
      }
      if (filters.status) {
        params = params.set('status', filters.status);
      }
    }

    return this.http.get<ApiResponse<SupportTicket[]>>(this.baseUrl, { params }).pipe(
      map(response => response.data || [])
    );
  }

  /**
   * Create a new support ticket
   * @param ticketData Data for the new support ticket
   * @returns Observable of created SupportTicket
   */
  createSupportTicket(ticketData: Partial<SupportTicket>): Observable<SupportTicket> {
    return this.http.post<ApiResponse<SupportTicket>>(this.baseUrl, ticketData).pipe(
      map(response => response.data)
    );
  }

  /**
   * Get a single support ticket by ID
   * @param ticketId The ID of the support ticket
   * @returns Observable of SupportTicket
   */
  getSupportTicketById(ticketId: string): Observable<SupportTicket> {
    return this.http.get<ApiResponse<SupportTicket>>(`${this.baseUrl}/${ticketId}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Update a support ticket
   * @param ticketId The ID of the support ticket
   * @param ticketData Updated ticket data
   * @returns Observable of updated SupportTicket
   */
  updateSupportTicket(ticketId: string, ticketData: Partial<SupportTicket>): Observable<SupportTicket> {
    return this.http.put<ApiResponse<SupportTicket>>(`${this.baseUrl}/${ticketId}`, ticketData).pipe(
      map(response => response.data)
    );
  }
}
