import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {MaterialType} from "../@types/material-type";
import {Material} from "../@types/material";

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor() {}
  getMaterial(): Observable<Material[]> {
    return of([
      {
        title: 'Aula 02: Adjectives + Nouns ',
        description: 'mathematics.pdf',
        type: MaterialType.VIDEO,
      },
      {
        title: 'Aula 02: Adjectives + Nouns ',
        description: 'mathematics.pdf',
        type: MaterialType.DOCUMENTATION,
      },
      {
        title: 'Aula 02: Adjectives + Nouns + Exercises ',
        description: 'mathematics.pdf',
        type: MaterialType.VIDEO,
      },
      {
        title: 'Aula 02: Adjectives + Nouns ',
        description: 'mathematics.pdf',
        type: MaterialType.QUIZ,
      },
      {
        title: 'Aula 02: Adjectives + Nouns ',
        description: 'mathematics.pdf',
        type: MaterialType.EXAM,
      },
    ]);
  }
}
