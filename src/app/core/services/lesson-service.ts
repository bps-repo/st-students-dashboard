import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { LessonSchedule, LessonScheduleStatus } from "../models/LessonSchedule";
import { ApiResponse } from "../dtos/api-response";
import { Store } from "@ngrx/store";
import { StudentSelectors } from "../state/student/student.selectors";

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = `${environment.apiUrl}/students/me`;
  private store$ = inject(Store)
  protected studentId?: string

  constructor(private readonly http: HttpClient) {
    this.store$.select(StudentSelectors.student).subscribe(student => {
      this.studentId = student?.id;
    });
  }

  // Example method to get lessons
  getLessons(status?: LessonScheduleStatus): Observable<LessonSchedule[]> {
    const params = new HttpParams().set('status', status || '');

    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/lessons`, { params }).pipe(
      map(response => (response.data || []).map((lesson) => {
        const startDateTime = lesson?.startDateTime || lesson?.startDatetime;
        const endDateTime = lesson?.endDateTime || lesson?.endDatetime;
        return {
          ...lesson,
          startTime: startDateTime ? new Date(startDateTime) : undefined,
          endTime: endDateTime ? new Date(endDateTime) : undefined
        };
      }))
    );
  }

  // Get lesson history with date range
  getLessonHistory(status?: LessonScheduleStatus, startDate?: string, endDate?: string): Observable<LessonSchedule[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/lessons`, { params }).pipe(
      map(response => (response.data || []).map((lesson) => {
        const startDateTime = lesson?.startDateTime || lesson?.startDatetime;
        const endDateTime = lesson?.endDateTime || lesson?.endDatetime;
        return {
          ...lesson,
          startTime: startDateTime ? new Date(startDateTime) : undefined,
          endTime: endDateTime ? new Date(endDateTime) : undefined
        };
      }))
    );
  }
}
