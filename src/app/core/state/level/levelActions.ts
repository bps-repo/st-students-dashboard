import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Level} from "../../models/Level";

export const LEVEL_FEATURE_KEY = "level";

export const LevelActions = createActionGroup(
  {
    source: LEVEL_FEATURE_KEY,
    events: {

      // All available levels
      loadLevels: emptyProps(),
      loadLevelsSuccess: props<{ levels: Level[] }>(),
      loadLevelsFailed: props<{ errors: any }>(),

      // Student Level
      loadStudentLevel: emptyProps(),
      loadStudentLevelSuccess: props<{ levelStudent: Level }>(),
      loadStudentLevelFailure: props<{ errors: any }>(),

      clearLevel: emptyProps(),
    }
  }
)
