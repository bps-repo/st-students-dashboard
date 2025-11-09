import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, catchError, delay} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ApiResponse} from '../dtos/api-response';
import {AuthResponse} from '../dtos/auth-response';
import {UserToken} from '../models/userToken';
import {User} from '../models/User';

export const AUTH_STORAGE_KEYS = {
  USER: 'auth_user',
  AUTH_RESPONSE: 'auth_response',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
} as const;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private readonly usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  /**
   * Login with email and password
   * @returns Observable of AuthResponse or error
   */
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.authUrl}/login`, {username, password}).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        return response.data as AuthResponse;
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Login failed';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Get current user information
   * @returns Observable of User or error
   */
  getCurrentUser(): Observable<User> {
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    return this.http.get<ApiResponse<User>>(`${this.usersUrl}/${userId}`).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        return response.data as User;
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to get user information';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Logout the current user
   * @returns Observable that completes when logout is successful
   */
  logout(): Observable<void> {
    // In a real implementation, this would call an API endpoint to invalidate the token
    return of(void 0);
  }

  /**
   * Request password reset - sends OTP to email
   * @param email Email address for password reset
   */
  forgotPassword(email: string): Observable<string> {
    return this.http.post<any>(`${this.authUrl}/forgot-password`, {email}).pipe(
      map(response => {
        // Handle both response structures: {success, data} or {status, data}
        if (!response) {
          throw new Error('Invalid response from server');
        }
        // Check if response has data field
        if (response.data) {
          return response.data as string;
        }
        // Fallback: check if response itself is a string or has message
        if (typeof response === 'string') {
          return response;
        }
        if (response.message) {
          return response.message;
        }
        throw new Error('Invalid response from server');
      }),
      catchError(error => {
        const errorMessage = error.error?.message || error.error?.data || error.message || 'Failed to send password reset email';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Verify reset password token (OTP)
   * @param resetToken The OTP token received via email
   */
  verifyResetPassword(resetToken: string): Observable<string> {
    return this.http.post<any>(`${this.authUrl}/verify-reset-password`, {resetToken}).pipe(
      map(response => {
        // Handle both response structures: {success, data} or {status, data}
        if (!response) {
          throw new Error('Invalid response from server');
        }
        // Check if response has data field
        if (response.data) {
          return response.data as string;
        }
        // Fallback: check if response itself is a string or has message
        if (typeof response === 'string') {
          return response;
        }
        if (response.message) {
          return response.message;
        }
        throw new Error('Invalid response from server');
      }),
      catchError(error => {
        const errorMessage = error.error?.message || error.error?.data || error.message || 'Invalid reset token';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Reset password with token and new password
   * @param token The verified reset token
   * @param newPassword The new password
   */
  resetPasswordWithToken(token: string, newPassword: string): Observable<string> {
    return this.http.post<any>(`${this.authUrl}/reset-password`, {
      token,
      newPassword
    }).pipe(
      map(response => {
        // Handle both response structures: {success, data} or {status, data}
        if (!response) {
          throw new Error('Invalid response from server');
        }
        // Check if response has data field
        if (response.data) {
          return response.data as string;
        }
        // Fallback: check if response itself is a string or has message
        if (typeof response === 'string') {
          return response;
        }
        if (response.message) {
          return response.message;
        }
        throw new Error('Invalid response from server');
      }),
      catchError(error => {
        const errorMessage = error.error?.message || error.error?.data || error.message || 'Failed to reset password';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Request password reset (legacy method - kept for backward compatibility)
   * @param email Email address for password reset
   * @deprecated Use forgotPassword instead
   */
  resetPassword(email: string): Observable<void> {
    return this.forgotPassword(email).pipe(
      map(() => void 0)
    );
  }

  /**
   * Verify OTP code for password reset (legacy method - kept for backward compatibility)
   * @param email Email address
   * @param otp One-time password code
   * @deprecated Use verifyResetPassword instead
   */
  verifyOtp(email: string, otp: string): Observable<void> {
    return this.verifyResetPassword(otp).pipe(
      map(() => void 0)
    );
  }

  /**
   * Parse JWT token to get user information
   * @param token JWT token string
   * @returns UserToken object or null if token is invalid
   */
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
      return null;
    }
  }

  /**
   * Get access token from storage
   */
  getAccessToken(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Save auth tokens to storage
   */
  saveAuthTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  /**
   * Save user to local storage
   */
  saveUser(user: UserToken): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Clear all auth-related data from storage
   */
  clearAuthData(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.AUTH_RESPONSE);
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Get current user ID from token
   */
  getUserId(): string | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }

    const userToken = this.getUserFromToken(token);
    return userToken?.sub || null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
