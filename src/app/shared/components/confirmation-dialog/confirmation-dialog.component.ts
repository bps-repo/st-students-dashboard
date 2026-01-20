import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info' | 'success';
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="confirmation-dialog">
      <!-- Header with icon -->
      <div class="dialog-header" [ngClass]="'bg-' + getColorClass()">
        <div class="icon-container">
          <i [class]="getIcon()" class="text-4xl"></i>
        </div>
      </div>

      <!-- Content -->
      <div class="dialog-content">
        <h2 class="dialog-title">{{ data.title }}</h2>
        <p class="dialog-message">{{ data.message }}</p>
      </div>

      <!-- Actions -->
      <div class="dialog-actions">
        <button
          (click)="onCancel()"
          class="btn btn-cancel"
        >
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button
          (click)="onConfirm()"
          class="btn btn-confirm"
          [ngClass]="'btn-' + getColorClass()"
        >
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirmation-dialog {
      font-family: 'Poppins', sans-serif;
      width: 100%;
      max-width: 450px;
    }

    .dialog-header {
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.75rem 0.75rem 0 0;
    }

    .bg-warning { background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); }
    .bg-danger { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
    .bg-info { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
    .bg-success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

    .icon-container {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      animation: pulse 2s ease-in-out infinite;
    }

    .icon-container i {
      color: white;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .dialog-content {
      padding: 2rem;
      text-align: center;
    }

    .dialog-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 1rem 0;
    }

    .dialog-message {
      font-size: 1rem;
      color: #6b7280;
      line-height: 1.6;
      margin: 0;
    }

    .dialog-actions {
      padding: 0 2rem 2rem 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.95rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 120px;
    }

    .btn-cancel {
      background: #f3f4f6;
      color: #6b7280;
    }

    .btn-cancel:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .btn-confirm {
      color: white;
    }

    .btn-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
    }

    .btn-warning:hover {
      background: linear-gradient(135deg, #d97706 0%, #ea580c 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .btn-danger:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
    }

    .btn-info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .btn-info:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    .btn-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .btn-success:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }

    .btn:active {
      transform: translateY(0);
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
    // Set default type if not provided
    if (!this.data.type) {
      this.data.type = 'info';
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'warning':
        return 'pi pi-exclamation-triangle';
      case 'danger':
        return 'pi pi-times-circle';
      case 'success':
        return 'pi pi-check-circle';
      case 'info':
      default:
        return 'pi pi-info-circle';
    }
  }

  getColorClass(): string {
    return this.data.type || 'info';
  }
}
