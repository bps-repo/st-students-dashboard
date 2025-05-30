export interface LessonSchedule extends LessonScheduleUI {
  id: string;
  title: string;
  description: string;
  online: boolean;
  onlineLink: string;
  startDateTime: Date;
  endDateTime: Date;
  lessonId: string;
  unitId: string;
  centerId: string;
  teacherId?: string;
  status: string;
}


export interface LessonScheduleUI {
  color: string;
  description: string;
}
