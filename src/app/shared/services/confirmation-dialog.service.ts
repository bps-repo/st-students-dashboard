import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Open a confirmation dialog
   * @param data Dialog configuration
   * @returns Observable<boolean> - true if confirmed, false if canceled
   */
  confirm(data: ConfirmationDialogData): Observable<boolean> {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean> = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '450px',
        maxWidth: '90vw',
        data: data,
        panelClass: 'responsive-dialog',
        disableClose: false,
        autoFocus: true
      }
    );

    return dialogRef.afterClosed().pipe(
      map(result => result === true)
    );
  }

  /**
   * Quick method for event enrollment confirmation
   */
  confirmEnrollment(eventTitle: string): Observable<boolean> {
    return this.confirm({
      title: 'Confirmar Inscrição',
      message: `Tem certeza que deseja se inscrever no evento "${eventTitle}"?`,
      confirmText: 'Sim, inscrever',
      cancelText: 'Cancelar',
      type: 'info'
    });
  }

  /**
   * Quick method for event cancellation confirmation
   */
  confirmCancellation(eventTitle: string): Observable<boolean> {
    return this.confirm({
      title: 'Cancelar Inscrição',
      message: `Tem certeza que deseja cancelar sua inscrição no evento "${eventTitle}"?`,
      confirmText: 'Sim, cancelar',
      cancelText: 'Não',
      type: 'warning'
    });
  }

  /**
   * Quick method for dangerous actions
   */
  confirmDanger(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title: title,
      message: message,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      type: 'danger'
    });
  }

  /**
   * Quick method for success confirmations
   */
  confirmSuccess(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title: title,
      message: message,
      confirmText: 'OK',
      cancelText: 'Cancelar',
      type: 'success'
    });
  }
}
