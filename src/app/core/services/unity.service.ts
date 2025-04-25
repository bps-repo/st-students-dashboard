import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Unit } from '../../features/@types/unit';

@Injectable({
  providedIn: 'root',
})
export class UnityService {
  constructor() {}
  getUnities(): Observable<Unit[]> {
    return of([
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
        title: 'Unidade 3',
        description: 'Past Simple - Regular Verbs',
        status: 'reading',
      },
      {
        title: 'Unidade 4',
        description: 'Perfect Tense - Verb to have + main verb',
        status: 'lock',
      },
    ]);
  }
}
