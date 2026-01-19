import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Certificate } from '../../models/Certificate';

/**
 * Certificates Actions
 */
export const certificatesFeatureKey = 'certificates';

export const CertificatesActions = createActionGroup({
  source: certificatesFeatureKey,
  events: {
    // Load Certificates
    'Load Certificates': props<{ studentId: string }>(),
    'Load Certificates Success': props<{ certificates: Certificate[] }>(),
    'Load Certificates Failure': props<{ error: string }>(),

    // Select Certificate
    'Select Certificate': props<{ certificate: Certificate }>(),
    'Clear Selected Certificate': emptyProps(),

    // Download Certificate
    'Download Certificate': props<{ certificateId: string }>(),
    'Download Certificate Success': emptyProps(),
    'Download Certificate Failure': props<{ error: string }>(),

    // Clear state
    'Clear Error': emptyProps(),
    'Clear Certificates': emptyProps(),
  },
});
