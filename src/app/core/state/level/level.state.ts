import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Level} from "../../models/Level";

export interface LevelState extends EntityState<Level> {
  errors: any,
  loading: boolean,
  loadingLevels: boolean,
  levelStudent: Level | null,
  levels: Level[]
}

export const levelAdapter: EntityAdapter<Level> = createEntityAdapter<Level>
({
  selectId: (level: Level) => level.id!,
  sortComparer: false
})

export const initialState: LevelState = levelAdapter.getInitialState({
    errors: null,
    loading: false,
    levelStudent: null,
    loadingLevels: false,
    levels: []
  }
)
