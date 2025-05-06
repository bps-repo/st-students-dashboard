import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CircularLevelComponent} from '../../shared/components/circular-level/circular-level.component';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectAllUnits, selectUnitsError, selectUnitsLoading} from '../../core/state/units/units.selectors';
import {UnitsActions} from "../../core/state/units/units.actions";
import {authSelectors} from "../../core/state/auth/auth.selectors";
import {User} from "../../core/models/User";
import {Unit} from "../../core/models/Unit";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, CircularLevelComponent, MatDialogModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  selectedValue: string = '';
  protected unities$: Observable<Unit[]>;
  protected loading$: Observable<boolean>;
  protected error$: Observable<string | null>;
  protected user$!: Observable<User | null>;

  private readonly dialog = inject(MatDialog);

  constructor(public store: Store) {
    this.unities$ = this.store.select(selectAllUnits);
    this.loading$ = of(false);
    this.error$ = of(null);

    this.loading$ = this.store.select(selectUnitsLoading);
    this.error$ = this.store.select(selectUnitsError);
  }

  ngOnInit(): void {
    this.user$ = this.store.select(authSelectors.user);
    this.store.dispatch(UnitsActions.loadUnits());
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
    width?: string
  ): void {
    let modalWidth: string;

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
