export enum EventType {
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  CONFERENCE = 'CONFERENCE',
  MEETING = 'MEETING',
  TALK = 'TALK',
  TOUR = 'TOUR',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER'
}

export interface EventParticipation {
  createdAt: string; // date-time
  updatedAt: string; // date-time
  id: string; // uuid
  eventId: string; // uuid
  studentId: string; // uuid
  attended: boolean;
}

export interface Event {
  id: string; // uuid
  title: string;
  online: boolean;
  onlineLink: string | null;
  location: string | null;
  maxCapacity: number; // int32
  description: string;
  type: EventType;
  startAt: string; // date-time
  endAt: string; // date-time
  participations: EventParticipation[];
}

export interface EventsPage {
  content: Event[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  first: boolean;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  number: number;
  size: number;
  empty: boolean;
}
