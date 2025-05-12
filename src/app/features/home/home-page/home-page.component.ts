import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {combineLatest, map, Observable, Observer, of, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {CircularLevelComponent} from "../../../shared/components/circular-level/circular-level.component";
import {Unit} from "../../../core/models/Unit";
import {User} from "../../../core/models/User";
import {selectAllUnits, selectUnitsError, selectUnitsLoading} from "../../../core/state/units/units.selectors";
import {authSelectors} from "../../../core/state/auth/auth.selectors";
import {UnitsActions} from "../../../core/state/units/units.actions";
import {Student} from "../../../core/models/Student";
import {StudentSelectors} from "../../../core/state/student/student.selectors";
import {StudentActions} from "../../../core/state/student/studentActions";
import {Level} from "../../../core/models/Level";
import {LevelActions} from "../../../core/state/level/levelActions";
import {LevelSelectors} from "../../../core/state/level/level.selectors";


@Component({
  selector: 'app-home-page',
  imports: [CommonModule, CircularLevelComponent, MatDialogModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  selectedValue: string = '';
  protected units$: Observable<Unit[]>;
  protected loading$: Observable<boolean>;
  protected error$: Observable<string | null>;
  protected user$!: Observable<User | null>;
  protected level$!: Observable<Level | null>;

  protected student$!: Observable<Student | null>

  private readonly dialog = inject(MatDialog);

  constructor(public store: Store) {
    this.units$ = this.store.select(selectAllUnits);
    this.level$ = this.store.select(LevelSelectors.level)
    this.loading$ = of(false);
    this.error$ = of(null);

    this.loading$ = this.store.select(selectUnitsLoading);
    this.error$ = this.store.select(selectUnitsError);

    this.student$ = this.store.select(StudentSelectors.student)
  }

  ngOnInit(): void {
    // this.user$ = this.store.select(authSelectors.user);
    // Update units' statuses based on student.unit
    // this.units$ = combineLatest([this.store.select(selectAllUnits), this.student$]).pipe(
    //   map(([units, student]) => {
    //     if (!student) return units;
    //     console.log(student)
    //
    //     return units.map(unit => {
    //       if (unit.id === student.currentUnit.id) {
    //         return {...unit, status: 'available'};
    //       }
    //       return {...unit, status: 'lock'};
    //     });
    //   })
    // );
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
