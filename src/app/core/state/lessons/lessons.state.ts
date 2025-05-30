import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {LessonSchedule} from "../../models/LessonSchedule";

/**
 * Lessons state interface using entity adapter for normalized state
 */
export interface LessonsState extends EntityState<LessonSchedule> {
  selectedLessonId: string | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    online?: boolean;
    status?: string;
  };
}

/**
 * Entity adapter for lessons
 */
export const lessonsAdapter: EntityAdapter<LessonSchedule> = createEntityAdapter<LessonSchedule>({
  // Use id as the ID, falling back to label if id is not available
  selectId: (lesson: LessonSchedule) => lesson.id,
  // Sort by label
  sortComparer: (a: LessonSchedule, b: LessonSchedule) => a.id.localeCompare(b.id),
});

/**
 * Initial lessons state
 */
export const initialLessonsState: LessonsState = lessonsAdapter.getInitialState(
  lessonsAdapter.getInitialState({
    selectedLessonId: null,
    isLoading: false,
    error: null,
    filters: {
      online: undefined,
      status: undefined,
    },
  })
);
