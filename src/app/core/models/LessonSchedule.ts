export interface LessonSchedule extends Partial<LessonScheduleUI> {
  id: string;
  title: string;
  description: string;
  online: boolean;
  onlineLink: string;
  startTime: Date;
  endTime: Date;
  lessonId: string;
  unitId: string;
  centerId: string;
  teacherId?: string;
  status: LessonScheduleStatus;
}


export interface LessonScheduleUI {
  color: string;
}

export enum LessonScheduleStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  RESCHEDULED = 'RESCHEDULED',
  BOOKED = 'BOOKED',
  AVAILABLE = 'AVAILABLE'
}
