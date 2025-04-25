import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Lesson } from '../../../features/@types/lesson';

/**
 * Lessons state interface using entity adapter for normalized state
 */
export interface LessonsState extends EntityState<Lesson> {
  selectedLessonId: string | null;
  selectedCourseId: string | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    courseId?: string;
    status?: string;
    type?: string;
    isFavorite?: boolean;
  };
}

/**
 * Entity adapter for lessons
 */
export const lessonsAdapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  // Use id as the ID, falling back to label if id is not available
  selectId: (lesson: Lesson) => lesson.id || lesson.label,
  // Sort by label
  sortComparer: (a: Lesson, b: Lesson) => a.label.localeCompare(b.label),
});

/**
 * Initial lessons state
 */
export const initialLessonsState: LessonsState = lessonsAdapter.getInitialState({
  selectedLessonId: null,
  selectedCourseId: null,
  isLoading: false,
  error: null,
  filters: {},
});
