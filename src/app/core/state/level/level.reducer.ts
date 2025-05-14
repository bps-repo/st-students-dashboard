import {createFeature, createReducer, on} from "@ngrx/store";
import {LevelActions, LEVEL_FEATURE_KEY} from "./levelActions";
import {initialState} from "./level.state";

export const levelFeature = createFeature({
  name: LEVEL_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(LevelActions.loadStudentLevel, (state) => ({
      ...state,
      errors: null,
      loading: true,
    })),
    on(LevelActions.loadStudentLevelSuccess, (state, {levelStudent}) => ({
        ...state,
        levelStudent,
        loading: false,
        errors: null,
      }
    )),
    on(LevelActions.loadStudentLevelFailure, (state, {errors}) => ({
      ...state,
      errors,
      loading: false
    })),
    on(LevelActions.clearLevel, (state) => ({
      ...state,
      student: null,
      loading: false,
      errors: null,
      levels: [],
    })),


    // Levels State
    on(LevelActions.loadLevels, (state, level) => ({
      ...state,
      loadingLevels: true,
      errors: null,
    })),
    on(LevelActions.loadLevelsSuccess, (state, {levels}) => ({
      ...state,
      levels,
      loadingLevels: false,
      errors: null,
    })),
    on(LevelActions.loadStudentLevelFailure, (state, {errors}) => ({
      ...state,
      errors,
      loadingLevels: false
    }))
  )
})
