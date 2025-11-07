import {createFeatureSelector, createSelector} from "@ngrx/store";
import {lessonsAdapter, LessonsState} from "./lessons.state";
import {LESSON_FEATURE_KEY} from "./lessons.actions";

const selectLessonsState = createFeatureSelector<LessonsState>(LESSON_FEATURE_KEY);

export const LessonsSelectors = {
  selectLessonsLoading: createSelector(selectLessonsState, state => state.isLoading),
  selectLessonsError: createSelector(selectLessonsState, state => state.error),
  selectHistoryLoading: createSelector(selectLessonsState, state => state.history.isLoading),
  selectHistoryError: createSelector(selectLessonsState, state => state.history.error),
  selectHistoryLessons: createSelector(selectLessonsState, state => state.history.lessons)
}


/**
 * Entity selectors from the adapter
 */
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = lessonsAdapter.getSelectors(selectLessonsState);


export const LessonsEntitySelectors = {
  selectLessonsIds: selectIds,
  selectLessonsEntities: selectEntities,
  selectAllLessons: selectAll,
  selectTotalLessons: selectTotal,
  selectLessonById: (lessonId: string) => createSelector(selectEntities, entities => entities[lessonId]),
};

