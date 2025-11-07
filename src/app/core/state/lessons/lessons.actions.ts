import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {LessonSchedule, LessonScheduleStatus} from "../../models/LessonSchedule";

export const LESSON_FEATURE_KEY = 'lessons';

export const LessonsActions = createActionGroup({
  source: LESSON_FEATURE_KEY,
  events: {
    // Load lessons for a course
    loadLessons: props<{ status?: LessonScheduleStatus }>(),
    loadLessonsSuccess: props<{ lessons: LessonSchedule[] }>(),
    loadLessonsFailure: props<{ error: any }>(),

    // Load lesson history with date range
    loadLessonHistory: props<{ status?: LessonScheduleStatus; startDate?: string; endDate?: string }>(),
    loadLessonHistorySuccess: props<{ lessons: LessonSchedule[] }>(),
    loadLessonHistoryFailure: props<{ error: any }>(),

    // Load a single lesson
    loadLesson: props<{ lessonId: string }>(),
    loadLessonSuccess: props<{ lesson: LessonSchedule }>(),
    loadLessonFailure: props<{ error: any }>(),

    // Select a lesson
    selectLesson: props<{ lessonId: string }>(),

    // Clear selected lesson and course
    clearSelection: emptyProps(),

    // Clear lessons state
    clearLessons: emptyProps(),
  }
})
