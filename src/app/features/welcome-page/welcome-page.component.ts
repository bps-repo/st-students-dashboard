import { Component, inject } from '@angular/core';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import type { TuiDialogContext, TuiDialogSize } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { CircularLevelComponent } from '../../shared/components/circular-level/circular-level.component';
import { Unit } from '../@types/unit';
import { UnityService } from '../../core/services/unity.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-welcome-page',
    imports: [CommonModule, CircularLevelComponent],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomePageComponent {
  selectedValue: string = '';
  protected unities$: Observable<Unit[]>;

  private readonly dialogs = inject(TuiDialogService);

  constructor(private readonly UnityService: UnityService) {
    this.unities$ = this.UnityService.getUnities();
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
