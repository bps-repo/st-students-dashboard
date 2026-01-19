import { createFeature, createReducer, on } from '@ngrx/store';
import { initialCertificatesState } from './certificates.state';
import { CertificatesActions, certificatesFeatureKey } from './certificates.actions';

export const certificatesFeature = createFeature({
  name: certificatesFeatureKey,
  reducer: createReducer(
    initialCertificatesState,
    // Load Certificates
    on(CertificatesActions.loadCertificates, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(CertificatesActions.loadCertificatesSuccess, (state, { certificates }) => ({
      ...state,
      certificates,
      isLoading: false,
      error: null,
    })),

    on(CertificatesActions.loadCertificatesFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Select Certificate
    on(CertificatesActions.selectCertificate, (state, { certificate }) => ({
      ...state,
      selectedCertificate: certificate,
    })),

    on(CertificatesActions.clearSelectedCertificate, (state) => ({
      ...state,
      selectedCertificate: null,
    })),

    // Download Certificate
    on(CertificatesActions.downloadCertificate, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(CertificatesActions.downloadCertificateSuccess, (state) => ({
      ...state,
      isLoading: false,
      error: null,
    })),

    on(CertificatesActions.downloadCertificateFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Clear state
    on(CertificatesActions.clearError, (state) => ({
      ...state,
      error: null,
    })),

    on(CertificatesActions.clearCertificates, () => initialCertificatesState)
  ),
});
