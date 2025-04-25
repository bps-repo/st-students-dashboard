import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../state/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'auth_user';

  constructor() { }

  /**
   * Login with email and password
   */
  login(email: string, password: string): Observable<User> {
    // This is a mock implementation
    // In a real application, this would call an API
    if (email === 'user@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email,
        name: 'Test User',
        token: 'mock-jwt-token'
      };

      // Store user in local storage
      localStorage.setItem(this.storageKey, JSON.stringify(user));

      return of(user).pipe(delay(1000)); // Simulate API delay
    }

    return throwError(() => new Error('Invalid email or password')).pipe(delay(1000));
  }

  /**
   * Logout the current user
   */
  logout(): Observable<void> {
    // Remove user from local storage
    localStorage.removeItem(this.storageKey);

    return of(void 0).pipe(delay(500)); // Simulate API delay
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
