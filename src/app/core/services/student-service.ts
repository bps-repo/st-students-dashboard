import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Student } from "../models/Student";
import { ApiResponse } from "../dtos/api-response";

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly baseUrl = `${environment.apiUrl}/students`;
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  /**
   * Get student information by email from the current authenticated user
   * @returns Observable of Student or error
   */
  getStudentByEmail(): Observable<Student> {
    const userToken = this.authService.getUserFromToken(this.authService.getAccessToken() || '');

    if (!userToken?.email) {
      return throwError(() => new Error('User not authenticated or email not available'));
    }

    return this.http.get<ApiResponse<Student>>(`${this.baseUrl}/by-email/${userToken.email}`).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        return response.data as Student;
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to get student information';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Get student information by user ID from the current authenticated user
   * @returns Observable of Student or error
   */
  getStudentById(): Observable<Student> {
    const userToken = this.authService.getUserFromToken(this.authService.getAccessToken() || '');

    if (!userToken?.id) {
      return throwError(() => new Error('User not authenticated or ID not available'));
    }

    return this.http.get<ApiResponse<Student>>(`${this.baseUrl}/${userToken.id}`).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        return response.data as Student;
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to get student information';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Update student information
   * @param student Student data to update
   * @returns Observable of updated Student or error
   */
  updateStudent(student: Partial<Student>): Observable<Student> {
    const userToken = this.authService.getUserFromToken(this.authService.getAccessToken() || '');

    if (!userToken?.id) {
      return throwError(() => new Error('User not authenticated or ID not available'));
    }

    return this.http.put<ApiResponse<Student>>(`${this.baseUrl}/${userToken.id}`, student).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        return response.data as Student;
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to update student information';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
