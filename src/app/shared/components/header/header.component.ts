import {Component, inject} from '@angular/core';
import {OverlayComponent} from '../overlay/overlay.component';
import {BehaviorSubject} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {authActions} from "../../../core/state/auth/auth.actions";

@Component({
  selector: 'app-header',
  imports: [OverlayComponent, CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private overlayState = new BehaviorSubject<boolean>(false);
  showOverlay$ = this.overlayState.asObservable();

  store = inject(Store)

  toggleOverlay() {
    const currentState = this.overlayState.getValue();
    this.overlayState.next(!currentState);
  }

  onLogout() {
    this.store.dispatch(authActions.logout())
  }
}
