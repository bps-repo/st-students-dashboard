export enum MeetingStatus {
  REQUESTED = 'REQUESTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface Meeting {
  id?: string;
  studentId: string;
  employeeId: string;
  createdByUserId: string;
  startAt: string;
  endAt: string;
  purpose: string;
  online: boolean;
  onlineLink?: string;
  location?: string;
  status: MeetingStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMeetingPayload {
  studentId: string;
  employeeId: string;
  createdByUserId: string;
  startAt: string;
  endAt: string;
  purpose: string;
  online: boolean;
  onlineLink?: string;
  location?: string;
  status: MeetingStatus;
}
