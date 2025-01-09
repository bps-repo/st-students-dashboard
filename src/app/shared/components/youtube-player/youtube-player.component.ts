import { Component } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  standalone: true,
  imports: [YouTubePlayer],
  template: '<youtube-player [width]="600"  placeholderButtonLabel="Afspil video"  videoId="mVjYG9TSN88"/>',
  selector: 'app-youtube-player',
})
export class YoutubePlayerComponent {}
