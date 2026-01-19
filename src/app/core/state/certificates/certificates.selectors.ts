import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CertificatesState } from './certificates.state';

const selectCertificates = createFeatureSelector<CertificatesState>('certificates');

export const CertificatesSelectors = {
  certificates: createSelector(
    selectCertificates,
    (state: CertificatesState) => state.certificates
  ),
  selectedCertificate: createSelector(
    selectCertificates,
    (state: CertificatesState) => state.selectedCertificate
  ),
  loading: createSelector(
    selectCertificates,
    (state: CertificatesState) => state.isLoading
  ),
  error: createSelector(
    selectCertificates,
    (state: CertificatesState) => state.error
  ),
  hasCertificates: createSelector(
    selectCertificates,
    (state: CertificatesState) => state.certificates.length > 0
  ),
  certificatesCount: createSelector(
    selectCertificates,
    (state: CertificatesState) => state.certificates.length
  ),
  certificatesSortedByDate: createSelector(
    selectCertificates,
    (state: CertificatesState) =>
      [...state.certificates].sort(
        (a, b) =>
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      )
  ),
};
