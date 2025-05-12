import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {CardSliderComponent} from '../../shared/components/card-slider/card-slider.component';
import {COURSES, LEVELS, VIDEOS} from "./courses.state";
import {Course} from "../../@types/course";

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, CardSliderComponent],
  templateUrl: './lessons.component.html',
})
export class LessonsComponent {
  protected readonly contents: Course[] = COURSES

  protected readonly levels: Course[] = LEVELS

  protected readonly videos: any[] = VIDEOS
}
