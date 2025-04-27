import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';

@Component({
    imports: [YouTubePlayer, CommonModule],
    template: '<youtube-player [width]="width" [height]="height" placeholderButtonLabel="Afspil video" videoId="mVjYG9TSN88"/>',
    selector: 'app-youtube-player'
})
export class YoutubePlayerComponent implements OnInit {
    @Input() videoId: string = 'mVjYG9TSN88';
    width: number = 0;
    height: number = 0;

    ngOnInit() {
        this.setPlayerDimensions();
        window.addEventListener('resize', () => this.setPlayerDimensions());
    }

    private setPlayerDimensions() {
        // Get the parent container width
        const container = document.querySelector('app-youtube-player')?.parentElement;
        if (container) {
            this.width = container.clientWidth;
            // Calculate height based on 16:9 aspect ratio
            this.height = Math.floor(this.width * 9 / 16);
        }
    }
}
