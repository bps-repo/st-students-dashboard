import { Certificate } from "../../models/Certificate";

/**
 * Certificates state interface
 */
export interface CertificatesState {
  certificates: Certificate[];
  selectedCertificate: Certificate | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial certificates state
 */
export const initialCertificatesState: CertificatesState = {
  certificates: [],
  selectedCertificate: null,
  isLoading: false,
  error: null,
};
