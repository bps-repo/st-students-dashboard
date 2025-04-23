import { Component } from '@angular/core';
import { YoutubePlayerComponent } from '../../../shared/components/youtube-player/youtube-player.component';

@Component({
    selector: 'app-material-detail',
    imports: [YoutubePlayerComponent],
    templateUrl: './material-detail.component.html',
    styleUrl: './material-detail.component.scss'
})
export class MaterialDetailComponent {
  protected listNumbers = new Array<number>(
    ...Array.from({ length: 50 }, (_, i) => i + 1),
  );
}
