export interface Certificate {
  id: string; // uuid
  student: CertificateStudent;
  levelId: string; // uuid
  levelName: string;
  issueDate: string; // date-time (ISO 8601)
  certificateNumber: string;
}

export interface CertificateStudent {
  id: string;
  name: string;
  email?: string;
}
