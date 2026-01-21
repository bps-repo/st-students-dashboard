import {RouterReducerState} from '@ngrx/router-store';
import {AuthState, initialAuthState} from './auth/auth.state';
import {UnitsState, initialUnitsState} from './units/units.state';
import {CoursesState, initialCoursesState} from './courses/courses.state';
import {authFeature} from "./auth/auth.reducer";
import {unitsFeature} from "./units/unitsFeature";
import {studentFeature} from "./student/student.reducer";
import {levelFeature} from "./level/level.reducer";
import {AuthEffects} from "./auth/auth.effects";
import {UnitsEffects} from "./units/units.effects";
import {StudentEffects} from "./student/student.effects";
import {LevelEffects} from "./level/level.effects";
import {initialStudentState, StudentState} from "./student/student.state";
import {initialLessonsState, LessonsState} from "./lessons/lessons.state";
import {lessonFeature} from "./lessons/lessons.feature";
import {LessonsEffects} from "./lessons/lessons.effects";
import {ChatBotInitialState, ChatbotState} from "./chatbot/chatbot.state";
import {ChatBotFeature} from "./chatbot/chatbot.feature";
import {ChatbotEffects} from "./chatbot/chatbot.effects";
import {LessonMaterialsState, initialLessonMaterialsState} from "./lesson-materials/lesson-materials.state";
import {lessonMaterialsFeature} from "./lesson-materials/lesson-materials.feature";
import {LessonMaterialsEffects} from "./lesson-materials/lesson-materials.effects";
import {NotificationsState, initialNotificationsState} from "./notifications/notifications.state";
import {notificationsFeature} from "./notifications/notifications.feature";
import {NotificationsEffects} from "./notifications/notifications.effects";
import {CertificatesState, initialCertificatesState} from "./certificates/certificates.state";
import {certificatesFeature} from "./certificates/certificates.feature";
import {CertificatesEffects} from "./certificates/certificates.effects";
import {EventsState, initialEventsState} from "./events/events.state";
import {eventsFeature} from "./events/events.feature";
import {EventsEffects} from "./events/events.effects";
import {SupportTicketsState, initialSupportTicketsState} from "./support-tickets/support-tickets.state";
import {supportTicketsFeature} from "./support-tickets/support-tickets.feature";
import {SupportTicketsEffects} from "./support-tickets/support-tickets.effects";
import {MeetingsState, initialMeetingsState} from "./meetings/meetings.state";
import {meetingsFeature} from "./meetings/meetings.feature";
import {MeetingsEffects} from "./meetings/meetings.effects";

/**
 * Interface for the root state of the application
 */
export interface AppState {
  router: RouterReducerState;
  auth: AuthState;
  units: UnitsState;
  courses: CoursesState;
  student: StudentState,
  lesson: LessonsState,
  chatBot: ChatbotState,
  lessonMaterials: LessonMaterialsState,
  notifications: NotificationsState,
  certificates: CertificatesState,
  events: EventsState,
  supportTickets: SupportTicketsState,
  meetings: MeetingsState
}

/**
 * Initial state for the application
 */
export const initialAppState: AppState = {
  router: {} as RouterReducerState,
  auth: initialAuthState,
  units: initialUnitsState,
  courses: initialCoursesState,
  student: initialStudentState,
  lesson: initialLessonsState,
  chatBot: ChatBotInitialState,
  lessonMaterials: initialLessonMaterialsState,
  notifications: initialNotificationsState,
  certificates: initialCertificatesState,
  events: initialEventsState,
  supportTickets: initialSupportTicketsState,
  meetings: initialMeetingsState
};


export const ngrxFeatures = [
  authFeature,
  unitsFeature,
  studentFeature,
  levelFeature,
  lessonFeature,
  ChatBotFeature,
  lessonMaterialsFeature,
  notificationsFeature,
  certificatesFeature,
  eventsFeature,
  supportTicketsFeature,
  meetingsFeature,
]

export const ngrxEffects = [
  AuthEffects,
  UnitsEffects,
  StudentEffects,
  LevelEffects,
  LessonsEffects,
  ChatbotEffects,
  LessonMaterialsEffects,
  NotificationsEffects,
  CertificatesEffects,
  EventsEffects,
  SupportTicketsEffects,
  MeetingsEffects
]
