import {createFeature, createReducer, on} from "@ngrx/store";
import {LevelActions, LEVEL_FEATURE_KEY} from "./levelActions";
import {initialState} from "./level.state";

export const levelFeature = createFeature({
  name: LEVEL_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(LevelActions.loadLevel, (state) => ({
      ...state,
      errors: null,
      loading: true,
    })),
    on(LevelActions.loadLevelSuccess, (state, {level}) => ({
        ...state,
        level,
        loading: false,
        errors: null,
      }
    )),
    on(LevelActions.loadLevelFailure, (state, {errors}) => ({
      ...state,
      errors,
      loading: false
    })),
    on(LevelActions.clearLevel, (state) => ({
      ...state,
      student: null,
      loading: false,
      errors: null,
    }))
  )
})
