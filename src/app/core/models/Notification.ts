export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  PROMOTION = 'PROMOTION',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  USER_MESSAGE = 'USER_MESSAGE',
  EVENT_REMINDER = 'EVENT_REMINDER',
  SECURITY_ALERT = 'SECURITY_ALERT',
  MAINTENANCE_NOTIFICATION = 'MAINTENANCE_NOTIFICATION'
}

export enum NotificationTargetType {
  ASSESSMENT = 'ASSESSMENT',
  LESSON = 'LESSON',
  COURSE = 'COURSE',
  CONTRACT = 'CONTRACT',
  PAYMENT = 'PAYMENT',
  GENERAL = 'GENERAL'
}

export enum NotificationChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH'
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  targetId: string;
  targetType: NotificationTargetType;
  channel: NotificationChannel;
  userId: string;
  createdAt: string;
  read: boolean;
}

