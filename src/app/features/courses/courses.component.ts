import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';
import {CardSliderComponent} from '../../shared/components/card-slider/card-slider.component';
import {Course} from '../@types/course';
import {COURSES, LEVELS} from "./courses.state";
import {CarouselComponent} from "../../shared/carousel/carousel.component";

@Component({
  selector: 'app-courses',
  imports: [CommonModule, CardSliderComponent, NgOptimizedImage, CarouselComponent],
  templateUrl: './courses.component.html',
})
export class CoursesComponent {
  protected readonly contents: Course[] = COURSES

  protected readonly levels: Course[] = LEVELS

  protected readonly videos: any[] = [
    {
      level: "Beginner",
      description: "Conversação Avançada: Expressões Idiomáticas ",
      views: 12
    },
    {
      level: "Elementary",
      description: "Gramática: Uso do Present Perfect",
      views: 12
    },
    {
      level: "Pre-Intermediate",
      description: "Vocabulário para Viagens e Turismo",
      views: 12
    },
    {
      level: "Intermediate",
      description: "Pronúncia: Sons Difíceis em Inglês",
      views: 12
    },
    {
      level: "Upper Intermediate",
      description: "Conversação Avançada: Expressões Idiomáticas ",
      views: 12
    },
    {
      level: "Upper Intermediate",
      description: "Conversação Avançada: Expressões Idiomáticas ",
      views: 12
    },
    {
      level: "Upper Intermediate",
      description: "Conversação Avançada: Expressões Idiomáticas ",
      views: 12
    },
    {
      level: "Upper Intermediate",
      description: "Conversação Avançada: Expressões Idiomáticas ",
      views: 12
    },
  ]
}
