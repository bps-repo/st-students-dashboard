import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Notification} from "../../models/Notification";

/**
 * Notifications Actions
 */
export const notificationsFeatureKey = 'notifications';

export const NotificationsActions = createActionGroup(
  {
    source: notificationsFeatureKey,
    events: {
      // Load Notifications
      loadNotifications: emptyProps(),
      loadNotificationsSuccess: props<{ notifications: Notification[] }>(),
      loadNotificationsFailure: props<{ error: string }>(),

      // Mark as Read
      markAsRead: props<{ notificationId: string }>(),
      markAsReadSuccess: props<{ notificationId: string }>(),
      markAsReadFailure: props<{ error: string }>(),

      // Mark All as Read
      markAllAsRead: emptyProps(),
      markAllAsReadSuccess: emptyProps(),
      markAllAsReadFailure: props<{ error: string }>(),

      // Clear state
      clearError: emptyProps(),
    },
  }
);

