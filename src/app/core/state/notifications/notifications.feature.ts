import {createFeature, createReducer, on} from '@ngrx/store';
import {initialNotificationsState} from './notifications.state';
import {NotificationsActions, notificationsFeatureKey} from "./notifications.actions";

export const notificationsFeature = createFeature({
  name: notificationsFeatureKey,
  reducer: createReducer(
    initialNotificationsState,
    // Load Notifications
    on(NotificationsActions.loadNotifications, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(NotificationsActions.loadNotificationsSuccess, (state, {notifications}) => ({
      ...state,
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      isLoading: false,
      error: null,
    })),

    on(NotificationsActions.loadNotificationsFailure, (state, {error}) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Mark as Read
    on(NotificationsActions.markAsRead, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(NotificationsActions.markAsReadSuccess, (state, {notificationId}) => ({
      ...state,
      notifications: state.notifications.map(notification =>
        notification.id === notificationId
          ? {...notification, read: true}
          : notification
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
      isLoading: false,
      error: null,
    })),

    on(NotificationsActions.markAsReadFailure, (state, {error}) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Mark All as Read
    on(NotificationsActions.markAllAsRead, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(NotificationsActions.markAllAsReadSuccess, (state) => ({
      ...state,
      notifications: state.notifications.map(notification => ({
        ...notification,
        read: true
      })),
      unreadCount: 0,
      isLoading: false,
      error: null,
    })),

    on(NotificationsActions.markAllAsReadFailure, (state, {error}) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Clear state
    on(NotificationsActions.clearError, (state) => ({
      ...state,
      error: null,
    }))
  )
});

