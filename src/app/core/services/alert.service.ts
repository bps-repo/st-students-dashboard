import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new BehaviorSubject<Alert | null>(null);
  private defaultAutoClose = true;

  constructor() { }

  // Enable subscribing to alerts observable
  onAlert(): Observable<Alert | null> {
    return this.subject.asObservable();
  }

  // Convenience methods
  success(message: string, options?: Partial<Alert>): void {
    this.alert({ type: 'success', message, ...options });
  }

  error(message: string, options?: Partial<Alert>): void {
    this.alert({ type: 'error', message, ...options });
  }

  info(message: string, options?: Partial<Alert>): void {
    this.alert({ type: 'info', message, ...options });
  }

  warning(message: string, options?: Partial<Alert>): void {
    this.alert({ type: 'warning', message, ...options });
  }

  // Main alert method
  alert(alert: Partial<Alert>): void {
    alert.autoClose = alert.autoClose ?? this.defaultAutoClose;
    this.subject.next(alert as Alert);
  }

  // Clear alerts
  clear(): void {
    this.subject.next(null);
  }
}
