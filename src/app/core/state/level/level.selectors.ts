import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LevelState} from "./level.state";
import {LEVEL_FEATURE_KEY} from "./levelActions";


const selectStudent = createFeatureSelector<LevelState>(LEVEL_FEATURE_KEY);

export const LevelSelectors = {
  level: createSelector(selectStudent, state => state.level),
  loading: createSelector(selectStudent, state => state.loading),
  errors: createSelector(selectStudent, state => state.errors),
}
