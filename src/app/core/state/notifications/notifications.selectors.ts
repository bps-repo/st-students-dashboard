import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NotificationsState} from './notifications.state';
import {Notification} from '../../models/Notification';

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
  unreadCount: createSelector(selectNotifications, (state: NotificationsState) => state.unreadCount),
  loading: createSelector(selectNotifications, (state: NotificationsState) => state.isLoading),
  error: createSelector(selectNotifications, (state: NotificationsState) => state.error),
  hasNotifications: createSelector(
    selectNotifications,
    (state: NotificationsState) => state.notifications.length > 0
  ),
};

