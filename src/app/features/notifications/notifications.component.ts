import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {NotificationsActions} from '../../core/state/notifications/notifications.actions';
import {NotificationsSelectors} from '../../core/state/notifications/notifications.selectors';
import {Notification, NotificationType} from '../../core/models/Notification';

/**
 * Notifications Component
 * 
 * Displays all notifications with loading and error indicators.
 * Supports marking notifications as read and filtering by read/unread status.
 */
@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications$!: Observable<Notification[]>;
  unreadNotifications$!: Observable<Notification[]>;
  readNotifications$!: Observable<Notification[]>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  unreadCount$!: Observable<number>;
  hasNotifications$!: Observable<boolean>;

  activeTab: 'all' | 'unread' | 'read' = 'all';

  constructor(private store: Store) {
    // Initialize observables
    this.notifications$ = this.store.select(NotificationsSelectors.notifications);
    this.unreadNotifications$ = this.store.select(NotificationsSelectors.unreadNotifications);
    this.readNotifications$ = this.store.select(NotificationsSelectors.readNotifications);
    this.isLoading$ = this.store.select(NotificationsSelectors.loading);
    this.error$ = this.store.select(NotificationsSelectors.error);
    this.unreadCount$ = this.store.select(NotificationsSelectors.unreadCount);
    this.hasNotifications$ = this.store.select(NotificationsSelectors.hasNotifications);
  }

  ngOnInit() {
    // Clear any previous errors
    this.store.dispatch(NotificationsActions.clearError());
    
    // Load notifications
    this.store.dispatch(NotificationsActions.loadNotifications());
  }

  markAsRead(notificationId: string) {
    this.store.dispatch(NotificationsActions.markAsRead({notificationId}));
  }

  markAllAsRead() {
    this.store.dispatch(NotificationsActions.markAllAsRead());
  }

  setActiveTab(tab: 'all' | 'unread' | 'read') {
    this.activeTab = tab;
  }

  getNotificationTypeClass(type: NotificationType): string {
    const typeClasses: { [key in NotificationType]: string } = {
      [NotificationType.INFO]: 'bg-blue-100 text-blue-800 border-blue-200',
      [NotificationType.SUCCESS]: 'bg-green-100 text-green-800 border-green-200',
      [NotificationType.WARNING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      [NotificationType.ERROR]: 'bg-red-100 text-red-800 border-red-200',
    };
    return typeClasses[type] || typeClasses[NotificationType.INFO];
  }

  getNotificationIcon(type: NotificationType): string {
    const icons: { [key in NotificationType]: string } = {
      [NotificationType.INFO]: 'ℹ️',
      [NotificationType.SUCCESS]: '✓',
      [NotificationType.WARNING]: '⚠',
      [NotificationType.ERROR]: '✕',
    };
    return icons[type] || icons[NotificationType.INFO];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
}
