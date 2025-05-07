import {Component, inject, OnInit} from '@angular/core';
import {OverlayComponent} from '../overlay/overlay.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {AuthActions} from "../../../core/state/auth/authActions";
import {UserToken} from "../../../core/models/userToken";
import {authSelectors} from "../../../core/state/auth/auth.selectors";

@Component({
  selector: 'app-header',
  imports: [OverlayComponent, CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  protected user$!: Observable<UserToken | null>;
  private overlayState = new BehaviorSubject<boolean>(false);
  showOverlay$ = this.overlayState.asObservable();

  store = inject(Store)

  toggleOverlay() {
    const currentState = this.overlayState.getValue();
    this.overlayState.next(!currentState);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout())
  }

  ngOnInit() {
    this.user$ = this.store.select((state) => state.auth.user);
  }
}
