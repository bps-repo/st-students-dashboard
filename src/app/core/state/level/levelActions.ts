import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Student} from "../../models/Student";
import {Level} from "../../models/Level";

export const LEVEL_FEATURE_KEY = "level";

export const LevelActions = createActionGroup(
  {
    source: LEVEL_FEATURE_KEY,
    events: {
      loadLevel: emptyProps(),
      loadLevelSuccess: props<{ level: Level }>(),
      loadLevelFailure: props<{ errors: any }>(),
      clearLevel: emptyProps(),
    }
  }
)
