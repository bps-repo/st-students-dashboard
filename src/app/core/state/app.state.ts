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
  chatBot: ChatbotState
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
  chatBot: ChatBotInitialState
};


export const ngrxFeatures = [
  authFeature,
  unitsFeature,
  studentFeature,
  levelFeature,
  lessonFeature,
  ChatBotFeature,
]

export const ngrxEffects = [
  AuthEffects,
  UnitsEffects,
  StudentEffects,
  LevelEffects,
  LessonsEffects,
  ChatbotEffects
]
