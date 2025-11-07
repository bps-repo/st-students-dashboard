import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ApiResponse} from '../dtos/api-response';
import {Notification} from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationsUrl = `${environment.apiUrl}/students/me/notifications`;

  constructor(private http: HttpClient) {
  }

  /**
   * Get all notifications for the current user
   * @returns Observable of Notification array
   */
  getNotifications(): Observable<Notification[]> {
    return this.http.get<ApiResponse<Notification[]>>(this.notificationsUrl).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        return response.data as Notification[];
      }),
      catchError(error => {
        const errorMessage = error.error?.message || error.message || 'Failed to load notifications';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Mark a notification as read
   * @param notificationId Notification ID
   * @returns Observable that completes when successful
   */
  markAsRead(notificationId: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.notificationsUrl}/${notificationId}/read`, {}).pipe(
      map(() => void 0),
      catchError(error => {
        const errorMessage = error.error?.message || error.message || 'Failed to mark notification as read';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Mark all notifications as read
   * @returns Observable that completes when successful
   */
  markAllAsRead(): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.notificationsUrl}/read-all`, {}).pipe(
      map(() => void 0),
      catchError(error => {
        const errorMessage = error.error?.message || error.message || 'Failed to mark all notifications as read';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

