import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileSidebarService {
  // Signal to manage mobile sidebar open/close state
  private _isOpen = signal(false);

  // Read-only signal for components to subscribe to
  readonly isOpen = this._isOpen.asReadonly();

  // Toggle the sidebar
  toggle(): void {
    this._isOpen.update(value => !value);
  }

  // Explicitly open the sidebar
  open(): void {
    this._isOpen.set(true);
  }

  // Explicitly close the sidebar
  close(): void {
    this._isOpen.set(false);
  }
}
