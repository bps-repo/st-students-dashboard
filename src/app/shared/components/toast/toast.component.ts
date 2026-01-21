import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, Alert } from '../../../core/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  alert: Alert | null = null;
  private subscription?: Subscription;
  private timeoutId?: any;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService.onAlert().subscribe(alert => {
      this.alert = alert;

      // Clear previous timeout if exists
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // Auto-close if enabled
      if (alert && alert.autoClose !== false) {
        this.timeoutId = setTimeout(() => {
          this.close();
        }, 5000); // 5 seconds default
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  close(): void {
    this.alertService.clear();
    this.alert = null;
  }

  getAlertClass(): string {
    if (!this.alert) return '';

    const baseClasses = 'fixed top-4 right-4 z-50 max-w-md w-full rounded-lg shadow-lg p-4 flex items-start gap-3 transition-all duration-300 transform';

    const typeClasses = {
      success: 'bg-green-50 border border-green-200 text-green-800',
      error: 'bg-red-50 border border-red-200 text-red-800',
      info: 'bg-blue-50 border border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800'
    };

    return `${baseClasses} ${typeClasses[this.alert.type] || typeClasses.info}`;
  }

  getIconClass(): string {
    if (!this.alert) return '';

    const iconClasses = {
      success: 'pi pi-check-circle',
      error: 'pi pi-times-circle',
      info: 'pi pi-info-circle',
      warning: 'pi pi-exclamation-triangle'
    };

    return iconClasses[this.alert.type] || iconClasses.info;
  }
}
