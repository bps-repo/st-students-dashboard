import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Certificate } from '../models/Certificate';
import { ApiResponse } from '../dtos/api-response';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private baseUrl = `${environment.apiUrl}/certificates`;

  constructor(private http: HttpClient) {}

  /**
   * Get all certificates for a specific student
   * @param studentId The ID of the student
   * @returns Observable of Certificate array
   */
  getStudentCertificates(studentId: string): Observable<Certificate[]> {
    return this.http
      .get<ApiResponse<Certificate[]>>(`${this.baseUrl}/student/${studentId}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Get a specific certificate by ID
   * @param certificateId The ID of the certificate
   * @returns Observable of Certificate
   */
  getCertificateById(certificateId: string): Observable<Certificate> {
    return this.http
      .get<ApiResponse<Certificate>>(`${this.baseUrl}/${certificateId}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Download certificate PDF
   * @param certificateId The ID of the certificate
   * @returns Observable of Blob (PDF bytes)
   */
  downloadCertificate(certificateId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${certificateId}`, {
      responseType: 'blob',
    });
  }
}
