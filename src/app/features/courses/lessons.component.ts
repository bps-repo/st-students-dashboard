import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';
import {CardSliderComponent} from '../../shared/components/card-slider/card-slider.component';
import {COURSES, LEVELS, VIDEOS} from "./courses.state";
import {CarouselComponent} from "../../shared/carousel/carousel.component";
import {Course} from "../../@types/course";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, CardSliderComponent, NgOptimizedImage, CarouselComponent, RouterLink],
  templateUrl: './lessons.component.html',
})
export class LessonsComponent {
  protected readonly contents: Course[] = COURSES

  protected readonly levels: Course[] = LEVELS

  protected readonly videos: any[] = VIDEOS
}
