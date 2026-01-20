import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Event, EventsPage } from '../models/Event';
import { ApiResponse } from '../dtos/api-response';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  /**
   * Get all events with pagination
   * @param page Page number (0-indexed)
   * @param size Page size
   * @returns Observable of EventsPage
   */
  getEvents(page: number = 0, size: number = 10): Observable<EventsPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http
      .get<ApiResponse<EventsPage>>(`${this.baseUrl}`, { params })
      .pipe(map((response) => response.data));
  }

  /**
   * Get a specific event by ID
   * @param eventId The ID of the event
   * @returns Observable of Event
   */
  getEventById(eventId: string): Observable<Event> {
    return this.http
      .get<ApiResponse<Event>>(`${this.baseUrl}/${eventId}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Register student for an event
   * @param eventId The ID of the event
   * @param studentId The ID of the student
   * @returns Observable of the participation
   */
  registerForEvent(eventId: string, studentId: string): Observable<any> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/${eventId}/students/${studentId}/participations`,
      {}
    ).pipe(map((response) => response.data));
  }

  /**
   * Cancel registration for an event
   * @param eventId The ID of the event
   * @param studentId The ID of the student
   * @returns no response
   */
  cancelRegistration(eventId: string, studentId: string): Observable<undefined> {
    return this.http.delete<ApiResponse<undefined>>(
      `${this.baseUrl}/${eventId}/students/${studentId}/participations`,
    ).pipe(map(() => undefined));
  }
  /**
   * Get upcoming events
   * @param page Page number
   * @param size Page size
   * @returns Observable of EventsPage
   */
  getUpcomingEvents(page: number = 0, size: number = 10): Observable<EventsPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('upcoming', 'true');

    return this.http
      .get<ApiResponse<EventsPage>>(`${this.baseUrl}`, { params })
      .pipe(map((response) => response.data));
  }
}
