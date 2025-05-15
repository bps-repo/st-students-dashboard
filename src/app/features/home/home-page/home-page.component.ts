import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {CircularLevelComponent} from "../../../shared/components/circular-level/circular-level.component";
import {Unit} from "../../../core/models/Unit";
import {selectAllUnits, selectUnitsError, selectUnitsLoading} from "../../../core/state/units/units.selectors";
import {UnitsActions} from "../../../core/state/units/units.actions";
import {Student} from "../../../core/models/Student";
import {StudentSelectors} from "../../../core/state/student/student.selectors";
import {Level} from "../../../core/models/Level";
import {LevelSelectors} from "../../../core/state/level/level.selectors";
import {CircularLoaderComponent} from "../../../shared/circular-loader/circular-loader.component";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {PushPipe} from "@ngrx/component";
import {RouterModule} from "@angular/router";


@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatDialogModule, CircularLoaderComponent, LoaderComponent, PushPipe, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  selectedValue: string = '';
  protected units$: Observable<Unit[]>;
  protected loadingUnit$: Observable<boolean>;
  protected loadingStudent$: Observable<boolean>;
  protected loadingLevel$: Observable<boolean>;
  protected error$: Observable<string | null>;
  protected level$!: Observable<Level | null>;

  protected student$!: Observable<Student | null>

  private readonly dialog = inject(MatDialog);

  constructor(public store: Store) {
    this.units$ = this.store.select(selectAllUnits);
    this.level$ = this.store.select(LevelSelectors.levelStudent)
    this.loadingUnit$ = of(false);
    this.error$ = of(null);

    // Loading values
    this.loadingStudent$ = this.store.select(StudentSelectors.loading)
    this.loadingLevel$ = this.store.select(LevelSelectors.loading)
    this.loadingUnit$ = this.store.select(selectUnitsLoading);
    this.error$ = this.store.select(selectUnitsError);

    this.student$ = this.store.select(StudentSelectors.student)
  }

  ngOnInit(): void {
  }

  protected items: any[] = [
    {
      label: 'A1',
      title: 'Beginner',
      description: 'Conclua as unidades anteriores',
      status: 'lock',
    },
    {
      label: 'A2',
      title: 'Elementary',
      description: 'Conclua as unidades anteriores',
      status: 'lock',
    },
    {
      label: 'B1',
      title: 'Intermediate',
      description: 'Conclua as unidades anteriores',
      status: 'lock',
    },
    {
      label: 'B2',
      title: 'Upper Intermediate',
      description: 'Conclua as unidades anteriores',
      status: 'lock',
    },
    {
      label: 'C1',
      title: 'Advanced',
      description: 'Conclua as unidades anteriores',
      status: 'lock',
    },
    {
      label: 'C2',
      title: 'Proficiency',
      description: 'Conclua as unidades anteriores',
      status: 'lock',
    },
  ];

  handleSelection(event: string) {
    this.selectedValue = event;
  }

  protected loadUnits = UnitsActions.loadUnits
}
