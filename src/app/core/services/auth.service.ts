import {Injectable} from '@angular/core';
import {map, Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {User} from '../state/auth/auth.state';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../dtos/api-response";
import {AuthResponse} from "../dtos/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'auth_user';
  private readonly apiUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) {
  }

  /**
   * Login with email and password
   */
  login(email: string, password: string): Observable<AuthResponse> {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, {email, password}).pipe(
      map((response) => {
        if (response) {
          console.log(`Login successful: ${JSON.stringify(response)}`);
          return response.data as AuthResponse;
        } else {
          throw new Error(response);
        }
      }),
    )
  }

  /**
   * Logout the current user
   */
  logout(): Observable<void> {
    // Remove user from local storage
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    return of(void 0)
  }

  /**
   * Get the current user from local storage
   */
  getCurrentUser(): Observable<User | null> {
    const userJson = localStorage.getItem(this.storageKey);

    if (userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        return of(user);
      } catch (error) {
        localStorage.removeItem(this.storageKey);
      }
    }

    return of(null);
  }

  /**
   * Request password reset
   */
  resetPassword(email: string): Observable<void> {
    // This is a mock implementation
    // In a real application, this would call an API
    return of(void 0).pipe(delay(1000)); // Simulate API delay
  }

  /**
   * Verify OTP code
   */
  verifyOtp(email: string, otp: string): Observable<void> {
    // This is a mock implementation
    // In a real application, this would call an API
    if (otp === '123456') {
      return of(void 0).pipe(delay(1000)); // Simulate API delay
    }

    return throwError(() => new Error('Invalid OTP code')).pipe(delay(1000));
  }
}
