import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import type { TuiDialogContext, TuiDialogSize } from '@taiga-ui/core';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { CircularLevelComponent } from '../../shared/components/circular-level/circular-level.component';
import { Unit } from '../@types/unit';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state';
import { selectAllUnits, selectUnitsLoading, selectUnitsError } from '../../core/state/units/units.selectors';
import { loadUnits } from '../../core/state/units/units.actions';

@Component({
    selector: 'app-home-page',
    imports: [CommonModule, CircularLevelComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  selectedValue: string = '';
  protected unities$: Observable<Unit[]>;
  protected loading$: Observable<boolean>;
  protected error$: Observable<string | null>;

  private readonly dialogs = inject(TuiDialogService);

  constructor(public store: Store<AppState>) {
    this.unities$ = this.store.select(selectAllUnits);
    this.loading$ = this.store.select(selectUnitsLoading);
    this.error$ = this.store.select(selectUnitsError);
  }

  ngOnInit(): void {
    // Dispatch action to load units when component initializes
    this.store.dispatch(loadUnits());
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
    modalContent: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogs
      .open(modalContent, {
        size,
      })
      .subscribe();
  }

  handleSelection(event: string) {
    this.selectedValue = event;
  }
}
