import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NotificationsState} from './notifications.state';
import {Notification, NotificationType} from '../../models/Notification';

const selectNotifications = createFeatureSelector<NotificationsState>('notifications');

export const NotificationsSelectors = {
  notifications: createSelector(selectNotifications, (state: NotificationsState) => state.notifications),
  unreadNotifications: createSelector(
    selectNotifications,
    (state: NotificationsState) => state.notifications.filter(n => !n.read)
  ),
  readNotifications: createSelector(
    selectNotifications,
    (state: NotificationsState) => state.notifications.filter(n => n.read)
  ),
  warningNotifications: createSelector(
    selectNotifications,
    (state: NotificationsState) => state.notifications.filter(n => n.type === NotificationType.WARNING && !n.read)
  ),
  firstWarningNotification: createSelector(
    selectNotifications,
    (state: NotificationsState) => {
      const warnings = state.notifications.filter(n => n.type === NotificationType.WARNING && !n.read);
      return warnings.length > 0 ? warnings[0] : null;
    }
  ),
  unreadCount: createSelector(selectNotifications, (state: NotificationsState) => state.unreadCount),
  loading: createSelector(selectNotifications, (state: NotificationsState) => state.isLoading),
  error: createSelector(selectNotifications, (state: NotificationsState) => state.error),
  hasNotifications: createSelector(
    selectNotifications,
    (state: NotificationsState) => state.notifications.length > 0
  ),
};

