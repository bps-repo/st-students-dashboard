import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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


@Component({
  selector: 'app-home-page',
  imports: [CommonModule, CircularLevelComponent, MatDialogModule, CircularLoaderComponent, LoaderComponent],
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
    this.level$ = this.store.select(LevelSelectors.level)
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

  protected onClick(
    modalContent: TemplateRef<any>,
    width?: string,
    unit?: Unit
  ): void {
    let modalWidth: string;

    if (unit?.status === 'lock') {
      return
    }

    // Convert size codes to responsive widths
    if (width === 'l') {
      modalWidth = '90vw';
      // Set a max-width to prevent the modal from becoming too wide on large screens
      const dialogRef = this.dialog.open(modalContent, {
        width: modalWidth,
        maxWidth: '800px',
        // Add responsive settings
        autoFocus: false,
        restoreFocus: false,
        panelClass: 'responsive-dialog'
      });
    } else {
      // Default size with responsive behavior
      modalWidth = width || '90vw';
      const dialogRef = this.dialog.open(modalContent, {
        width: modalWidth,
        maxWidth: '500px',
        autoFocus: false,
        restoreFocus: false,
        panelClass: 'responsive-dialog'
      });
    }
  }

  handleSelection(event: string) {
    this.selectedValue = event;
  }

  protected loadUnits = UnitsActions.loadUnits
}
