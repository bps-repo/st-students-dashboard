import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input, OnInit,
} from '@angular/core';
import { TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { Course } from '../../../features/@types/course';
import {AnimationFrameService} from "../../../core/animation-frame.service";
@Component({
    selector: 'app-card-slider',
    imports: [CommonModule, TuiPagination, TuiCarousel, TuiPagination],
    templateUrl: './card-slider.component.html',
    styleUrls: ['./card-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSliderComponent implements OnInit {
  @Input() index = 0;
  @Input() items: Course[] = [];
  protected textColor: string = '';
  protected bgColor: string = '';

  constructor(private animationService: AnimationFrameService) {
  }

  ngOnInit() {
    this.animationService.request(() => {})
  }
}
