import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Unit, UnitStatus } from "../../../core/models/Unit";
import { selectAllUnits, selectAllUnitsSorted, selectUnitsError, selectUnitsLoading } from "../../../core/state/units/units.selectors";
import { UnitsActions } from "../../../core/state/units/units.actions";
import { Student } from "../../../core/models/Student";
import { StudentSelectors } from "../../../core/state/student/student.selectors";
import { Level } from "../../../core/models/Level";
import { LevelSelectors } from "../../../core/state/level/level.selectors";
import { CircularLoaderComponent } from "../../../shared/circular-loader/circular-loader.component";
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { PushPipe } from "@ngrx/component";
import { Router, RouterModule } from "@angular/router";
import { Notification } from "../../../core/models/Notification";
import { NotificationsSelectors } from "../../../core/state/notifications/notifications.selectors";
import { NotificationsActions } from "../../../core/state/notifications/notifications.actions";


@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatDialogModule, CircularLoaderComponent, LoaderComponent, PushPipe, RouterModule],
  templateUrl: './home-page.component.html',
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
  protected warningNotification$!: Observable<Notification | null>;

  private readonly dialog = inject(MatDialog);

  constructor(public store: Store, private readonly router: Router) {
    this.units$ = this.store.select(selectAllUnitsSorted);
    this.level$ = this.store.select(LevelSelectors.levelStudent)
    this.loadingUnit$ = of(false);
    this.error$ = of(null);

    // Loading values
    this.loadingStudent$ = this.store.select(StudentSelectors.loading)
    this.loadingLevel$ = this.store.select(LevelSelectors.loading)
    this.loadingUnit$ = this.store.select(selectUnitsLoading);
    this.error$ = this.store.select(selectUnitsError);

    this.student$ = this.store.select(StudentSelectors.student)
    this.warningNotification$ = this.store.select(NotificationsSelectors.firstWarningNotification);
  }

  ngOnInit(): void {
    // Load notifications
    this.store.dispatch(NotificationsActions.loadNotifications());


    this.units$.subscribe(units => {
      console.log("units loadeds", units);
    });
  }

  navigateToUnit(unit: Unit) {
    if (unit.status === UnitStatus.LOCK) return
    this.router.navigate(['/units', unit.unitId]).then(r => {
    });
  }


  handleSelection(event: string) {
    this.selectedValue = event;
  }

  getCompletedUnitsCount(units: Unit[] | null | undefined): number {
    if (!units) return 0;
    return units.filter(unit => unit.status === UnitStatus.COMPLETE).length;
  }

  dismissWarningNotification(notificationId: string): void {
    this.store.dispatch(NotificationsActions.markAsRead({ notificationId }));
  }

  protected loadUnits = UnitsActions.loadUnits

  protected UnitStatus = UnitStatus;
}
