import {Injectable} from '@angular/core';
import {map, Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../dtos/api-response";
import {AuthResponse} from "../dtos/auth-response";
import {UserToken} from "../models/userToken";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'auth_user';
  private readonly authResponseKey = 'auth_response';
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

  getCurrentUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/user`).pipe(map(r => r.data as User))
  }

  /**
   * Logout the current user
   */
  logout(): Observable<void> {
    // Remove user from local storage
    localStorage.removeItem(this.storageKey);
    return of(void 0)
  }


  /**
   * Save user to local storage
   */
  saveUser(user: UserToken): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  /**
   * Get auth response from local storage
   */
  getAuthResponseFromStorage(): AuthResponse | null {
    const authResponseJson = localStorage.getItem(this.authResponseKey);

    if (authResponseJson) {
      try {
        return JSON.parse(authResponseJson) as AuthResponse;
      } catch (error) {
        localStorage.removeItem(this.authResponseKey);
      }
    }
    return null;
  }

  /**
   * Request password reset
   */
  resetPassword(email: string): Observable<void> {
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

  getUserFromToken(token: string): UserToken | null {
    if (!token) {
      return null;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      return JSON.parse(atob(parts[1])) as UserToken;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }
}
