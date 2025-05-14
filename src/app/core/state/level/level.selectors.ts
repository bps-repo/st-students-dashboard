import {createFeatureSelector, createSelector} from "@ngrx/store";
import {levelAdapter, LevelState} from "./level.state";
import {LEVEL_FEATURE_KEY} from "./levelActions";


const selectLevelState = createFeatureSelector<LevelState>(LEVEL_FEATURE_KEY);

export const LevelSelectors = {
  levelStudent: createSelector(selectLevelState, state => state.levelStudent),
  loading: createSelector(selectLevelState, state => state.loading),
  errors: createSelector(selectLevelState, state => state.errors),
  levels: createSelector(selectLevelState, state => state.levels),
  loadingLevels: createSelector(selectLevelState, state => state.loadingLevels)
}

const {
  selectIds,
  selectTotal,
  selectAll
} = levelAdapter.getSelectors(selectLevelState);

export const selectAllLevels = selectAll;
export const selectLevelTotal = selectTotal;
export const selectLevelIds = selectIds;
