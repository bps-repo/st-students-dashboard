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
      [NotificationType.INFO]: 'bg-blue-100 text-blue-700 border-blue-300',
      [NotificationType.SUCCESS]: 'bg-green-100 text-green-700 border-green-300',
      [NotificationType.WARNING]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      [NotificationType.ERROR]: 'bg-red-100 text-red-700 border-red-300',
      [NotificationType.PROMOTION]: 'bg-purple-100 text-purple-700 border-purple-300',
      [NotificationType.SYSTEM_ALERT]: 'bg-orange-100 text-orange-700 border-orange-300',
      [NotificationType.USER_MESSAGE]: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      [NotificationType.EVENT_REMINDER]: 'bg-pink-100 text-pink-700 border-pink-300',
      [NotificationType.SECURITY_ALERT]: 'bg-red-200 text-red-800 border-red-400',
      [NotificationType.MAINTENANCE_NOTIFICATION]: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return typeClasses[type] || typeClasses[NotificationType.INFO];
  }

  getNotificationIcon(type: NotificationType): string {
    const icons: { [key in NotificationType]: string } = {
      [NotificationType.INFO]: 'pi-info-circle',
      [NotificationType.SUCCESS]: 'pi-check-circle',
      [NotificationType.WARNING]: 'pi-exclamation-triangle',
      [NotificationType.ERROR]: 'pi-times-circle',
      [NotificationType.PROMOTION]: 'pi-tag',
      [NotificationType.SYSTEM_ALERT]: 'pi-bell',
      [NotificationType.USER_MESSAGE]: 'pi-comment',
      [NotificationType.EVENT_REMINDER]: 'pi-calendar',
      [NotificationType.SECURITY_ALERT]: 'pi-shield',
      [NotificationType.MAINTENANCE_NOTIFICATION]: 'pi-cog',
    };
    return icons[type] || icons[NotificationType.INFO];
  }

  getNotificationIconColor(type: NotificationType): string {
    const iconColors: { [key in NotificationType]: string } = {
      [NotificationType.INFO]: 'text-blue-600',
      [NotificationType.SUCCESS]: 'text-green-600',
      [NotificationType.WARNING]: 'text-yellow-600',
      [NotificationType.ERROR]: 'text-red-600',
      [NotificationType.PROMOTION]: 'text-purple-600',
      [NotificationType.SYSTEM_ALERT]: 'text-orange-600',
      [NotificationType.USER_MESSAGE]: 'text-indigo-600',
      [NotificationType.EVENT_REMINDER]: 'text-pink-600',
      [NotificationType.SECURITY_ALERT]: 'text-red-700',
      [NotificationType.MAINTENANCE_NOTIFICATION]: 'text-gray-600',
    };
    return iconColors[type] || iconColors[NotificationType.INFO];
  }

  getNotificationTypeLabel(type: NotificationType): string {
    const labels: { [key in NotificationType]: string } = {
      [NotificationType.INFO]: 'Informação',
      [NotificationType.SUCCESS]: 'Sucesso',
      [NotificationType.WARNING]: 'Aviso',
      [NotificationType.ERROR]: 'Erro',
      [NotificationType.PROMOTION]: 'Promoção',
      [NotificationType.SYSTEM_ALERT]: 'Alerta do Sistema',
      [NotificationType.USER_MESSAGE]: 'Mensagem',
      [NotificationType.EVENT_REMINDER]: 'Lembrete de Evento',
      [NotificationType.SECURITY_ALERT]: 'Alerta de Segurança',
      [NotificationType.MAINTENANCE_NOTIFICATION]: 'Manutenção',
    };
    return labels[type] || type;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Agora';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Há ${days} dia${days > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
