
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
  center: Center;
  teacher: Teacher;
  status: LessonScheduleStatus;
}

export interface Center {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}


export interface LessonScheduleUI {
  color: string;
}

export enum LessonScheduleStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  BOOKED = 'BOOKED',
}
