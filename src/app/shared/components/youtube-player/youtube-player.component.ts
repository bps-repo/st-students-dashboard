import { Component } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  standalone: true,
  imports: [YouTubePlayer],
  template: '<youtube-player disablePlaceholder="false" placeholderButtonLabel="Helder" videoId="mVjYG9TSN88"/>',
  selector: 'app-youtube-player',
})
export class YoutubePlayerComponent {}
