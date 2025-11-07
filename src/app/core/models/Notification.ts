export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
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

