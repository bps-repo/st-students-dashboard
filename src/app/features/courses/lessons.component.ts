import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardSliderComponent } from '../../shared/components/card-slider/card-slider.component';
import { COURSES, LEVELS, VIDEOS } from "./courses.state";
import { Course } from "../../@types/course";
import { Store } from "@ngrx/store";
import { LevelActions } from "../../core/state/level/levelActions";
import { Observable } from "rxjs";
import { Level } from "../../core/models/Level";
import { LevelSelectors, selectLevelTotal } from "../../core/state/level/level.selectors";
import { CircularLoaderComponent } from "../../shared/circular-loader/circular-loader.component";

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, CardSliderComponent, CircularLoaderComponent],
  templateUrl: './lessons.component.html',
})
export class LessonsComponent implements OnInit {
  levels$!: Observable<Level[]>
  loader$!: Observable<boolean>
  levelTotal!: Observable<number>

  protected readonly contents: Course[] = COURSES

  protected readonly levels: Course[] = LEVELS

  protected readonly videos: any[] = VIDEOS

  constructor(private store$: Store) {
    this.levelTotal = this.store$.select(selectLevelTotal)
    this.levels$ = this.store$.select(LevelSelectors.levels)
    this.loader$ = this.store$.select(LevelSelectors.loadingLevels)
  }

  ngOnInit() {
    this.store$.dispatch(LevelActions.loadLevels())
  }
}
