import {Notification} from "../../models/Notification";

/**
 * Notifications state interface
 */
export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial notifications state
 */
export const initialNotificationsState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

