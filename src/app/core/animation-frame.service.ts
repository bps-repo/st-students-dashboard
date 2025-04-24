import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationFrameService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  request(callback: FrameRequestCallback): number {
    if (isPlatformBrowser(this.platformId)) {
      return requestAnimationFrame(callback);
    }
    return 0;
  }

  cancel(handle: number): void {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(handle);
    }
  }
}
