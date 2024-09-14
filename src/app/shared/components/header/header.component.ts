import { Component } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [OverlayComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private overlayState = new BehaviorSubject<boolean>(false);
  showOverlay$ = this.overlayState.asObservable();

  toggleOverlay() {
    const currentState = this.overlayState.getValue(); // Get current value
    this.overlayState.next(!currentState); // Toggle value
  }
}
