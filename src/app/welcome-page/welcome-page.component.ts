import { Component } from '@angular/core';
import { CustomSelectComponent } from '../shared/components/custom-select/custom-select.component';
import { CommonModule } from '@angular/common';

interface Unit {
  title: string;
  description?: string;
  status?: string;
}

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, CustomSelectComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
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
  handleSelection(event: string) {
    this.selectedValue = event;
  }
}
