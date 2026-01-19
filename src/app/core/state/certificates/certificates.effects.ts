import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CertificateService } from '../../services/certificate.service';
import { CertificatesActions } from './certificates.actions';

@Injectable()
export class CertificatesEffects {
  private actions$: Actions = inject(Actions);
  private certificateService: CertificateService = inject(CertificateService);

  /**
   * Effect to load certificates
   */
  loadCertificates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificatesActions.loadCertificates),
      switchMap(({ studentId }) =>
        this.certificateService.getStudentCertificates(studentId).pipe(
          map((certificates) =>
            CertificatesActions.loadCertificatesSuccess({ certificates })
          ),
          catchError((error) =>
            of(
              CertificatesActions.loadCertificatesFailure({
                error: error.message || 'Failed to load certificates',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to download certificate
   */
  downloadCertificate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificatesActions.downloadCertificate),
      switchMap(({ certificateId }) =>
        this.certificateService.downloadCertificate(certificateId).pipe(
          tap((blob) => {
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `certificate-${certificateId}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
          }),
          map(() => CertificatesActions.downloadCertificateSuccess()),
          catchError((error) =>
            of(
              CertificatesActions.downloadCertificateFailure({
                error: error.message || 'Failed to download certificate',
              })
            )
          )
        )
      )
    )
  );
}
