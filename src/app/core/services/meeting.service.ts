import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { Meeting, CreateMeetingPayload } from '../models/Meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private baseUrl = `${environment.apiUrl}/meetings`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Create a new meeting
   * @param meetingData Data for the new meeting
   * @returns Observable of created Meeting
   */
  createMeeting(meetingData: CreateMeetingPayload): Observable<Meeting> {
    return this.http.post<ApiResponse<Meeting>>(this.baseUrl, meetingData).pipe(
      map(response => response.data)
    );
  }

  /**
   * Get meetings with optional filters
   * @param filters Optional filters
   * @returns Observable of Meeting array
   */
  getMeetings(filters?: {
    studentId?: string;
    employeeId?: string;
    status?: string;
    startAt?: string;
    endAt?: string;
  }): Observable<Meeting[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.studentId) {
        params = params.set('studentId', filters.studentId);
      }
      if (filters.employeeId) {
        params = params.set('employeeId', filters.employeeId);
      }
      if (filters.status) {
        params = params.set('status', filters.status);
      }
      if (filters.startAt) {
        params = params.set('startAt', filters.startAt);
      }
      if (filters.endAt) {
        params = params.set('endAt', filters.endAt);
      }
    }

    return this.http.get<ApiResponse<Meeting[]>>(this.baseUrl, { params }).pipe(
      map(response => response.data || [])
    );
  }

  /**
   * Get a single meeting by ID
   * @param meetingId The ID of the meeting
   * @returns Observable of Meeting
   */
  getMeetingById(meetingId: string): Observable<Meeting> {
    return this.http.get<ApiResponse<Meeting>>(`${this.baseUrl}/${meetingId}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Update a meeting
   * @param meetingId The ID of the meeting
   * @param meetingData Updated meeting data
   * @returns Observable of updated Meeting
   */
  updateMeeting(meetingId: string, meetingData: Partial<Meeting>): Observable<Meeting> {
    return this.http.put<ApiResponse<Meeting>>(`${this.baseUrl}/${meetingId}`, meetingData).pipe(
      map(response => response.data)
    );
  }

  /**
   * Cancel a meeting
   * @param meetingId The ID of the meeting to cancel
   * @returns Observable of updated Meeting
   */
  cancelMeeting(meetingId: string): Observable<Meeting> {
    return this.http.patch<ApiResponse<Meeting>>(`${this.baseUrl}/${meetingId}/cancel`, {}).pipe(
      map(response => response.data)
    );
  }
}
