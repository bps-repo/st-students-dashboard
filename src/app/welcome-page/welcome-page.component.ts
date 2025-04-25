import { Component, inject } from '@angular/core';
import { CustomSelectComponent } from '../shared/components/custom-select/custom-select.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import type { TuiDialogContext, TuiDialogSize } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { CircularLevelComponent } from '../shared/components/circular-level/circular-level.component';
import { LessonScheduleComponent } from '../features/school-schedule/lesson-schedule.component';

interface Unit {
  title: string;
  description?: string;
  status?: string;
}

@Component({
    selector: 'app-welcome-page',
    imports: [
        CommonModule,
        CustomSelectComponent,
        TuiButton,
        CircularLevelComponent,
        LessonScheduleComponent,
    ],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomePageComponent {
  selectedValue: string = '';
  unities: Unit[] = [
    {
      title: 'Unidade 1',
      description: 'Present Simple - Verb To Do',
      status: 'done',
    },
    {
      title: 'Unidade 2',
      description: 'Phrasel Verbs + Infinitive Verbs',
      status: 'done',
    },
    {
      title: 'Unidade 4',
      description: 'Past Simple - Regular Verbs',
      status: 'reading',
    },
    {
      title: 'Unidade 5',
      description: 'Perfect Tense - Verb to have + main verb',
      status: 'lock',
    },
    {
      title: 'Unidade 6',
      description: 'Modal Verbs- Could, would, might, ougth + to',
      status: 'lock',
    },
  ];

  items: any[] = [
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

  private readonly dialogs = inject(TuiDialogService);

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
