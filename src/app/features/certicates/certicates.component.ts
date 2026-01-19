import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { CircularLevelComponent } from '../../shared/components/circular-level/circular-level.component';
import { Certificate } from '../../core/models/Certificate';
import { CertificatesActions } from '../../core/state/certificates/certificates.actions';
import { CertificatesSelectors } from '../../core/state/certificates/certificates.selectors';
import { StudentSelectors } from '../../core/state/student/student.selectors';
import { Student } from '../../core/models/Student';
import { LoaderComponent } from '../../shared/loader/loader.component';

/**
 * Modern Certificates Component
 *
 * Displays the user's earned certificates and current level progress
 * with a modern, responsive design using NgRx state management.
 */
@Component({
  selector: 'app-certicates',
  imports: [CommonModule, CircularLevelComponent, PushPipe, LoaderComponent],
  templateUrl: './certicates.component.html',
})
export class CerticatesComponent implements OnInit {
  // Observables from store
  certificates$: Observable<Certificate[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hasCertificates$: Observable<boolean>;
  student$: Observable<Student | null>;

  // Certificate colors mapping for UI
  private colorMap = ['primary', 'accent', 'success', 'secondary', 'warning', 'info'];

  constructor(private store: Store) {
    this.certificates$ = this.store.select(CertificatesSelectors.certificatesSortedByDate);
    this.loading$ = this.store.select(CertificatesSelectors.loading);
    this.error$ = this.store.select(CertificatesSelectors.error);
    this.hasCertificates$ = this.store.select(CertificatesSelectors.hasCertificates);
    this.student$ = this.store.select(StudentSelectors.student);
  }

  ngOnInit(): void {
    // Load certificates for the current student
    this.student$.subscribe((student) => {
      if (student?.id) {
        this.store.dispatch(
          CertificatesActions.loadCertificates({ studentId: student.id })
        );
      }
    });
  }

  /**
   * Downloads the certificate PDF
   * @param certificateId The ID of the certificate to download
   */
  downloadCertificate(certificateId: string): void {
    this.store.dispatch(
      CertificatesActions.downloadCertificate({ certificateId })
    );
  }

  /**
   * Retry loading certificates
   */
  retry(): void {
    this.student$.subscribe((student) => {
      if (student?.id) {
        this.store.dispatch(
          CertificatesActions.loadCertificates({ studentId: student.id })
        );
      }
    });
  }

  /**
   * Get color for certificate based on index
   * @param index The index of the certificate
   * @returns The color class name
   */
  getCertificateColor(index: number): string {
    return this.colorMap[index % this.colorMap.length];
  }

  /**
   * Get certificate initials for display
   * @param levelName The level name
   * @returns Initials (e.g., "A1", "B2", "C1")
   */
  getCertificateInitials(levelName: string): string {
    // Extract level code if exists (A1, B2, C1, etc.)
    const match = levelName.match(/[ABC][12]/i);
    if (match) {
      return match[0].toUpperCase();
    }
    // Otherwise return first letter
    return levelName.substring(0, 1).toUpperCase();
  }

  /**
   * Format date for display
   * @param dateString ISO date string
   * @returns Formatted date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
