# Certificates Feature Implementation

## Overview
Complete implementation of the certificates feature with NgRx state management, matching the API specification:
- **Get Certificates**: `/certificates/student/{studentId}` [GET]
- **Download Certificate**: `/certificates/download/{certificateId}` [GET] - Returns PDF bytes

## Files Created

### 1. Core Model
**Location**: `src/app/core/models/Certificate.ts`
```typescript
export interface Certificate {
  id: string; // uuid
  student: CertificateStudent;
  levelId: string; // uuid
  levelName: string;
  issueDate: string; // date-time (ISO 8601)
  certificateNumber: string;
}
```

### 2. Service
**Location**: `src/app/core/services/certificate.service.ts`
- `getStudentCertificates(studentId: string)`: Fetch all certificates for a student
- `getCertificateById(certificateId: string)`: Get a specific certificate
- `downloadCertificate(certificateId: string)`: Download certificate as PDF

### 3. State Management (NgRx)
#### Files:
- `certificates.state.ts` - State interface and initial state
- `certificates.actions.ts` - Actions for loading, selecting, and downloading
- `certificates.feature.ts` - Reducer with all state transitions
- `certificates.effects.ts` - Side effects for API calls
- `certificates.selectors.ts` - Selectors for accessing state

#### Registered in: `app.state.ts`
- Added to `ngrxFeatures` array
- Added to `ngrxEffects` array

## Usage Example

### In a Component

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Certificate } from '@core/models/Certificate';
import { CertificatesActions } from '@core/state/certificates/certificates.actions';
import { CertificatesSelectors } from '@core/state/certificates/certificates.selectors';

@Component({
  selector: 'app-certificates',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    
    <div *ngIf="error$ | async as error" class="error">
      {{ error }}
    </div>

    <div class="certificates-grid">
      <div *ngFor="let cert of certificates$ | async" class="certificate-card">
        <h3>{{ cert.levelName }}</h3>
        <p>Número: {{ cert.certificateNumber }}</p>
        <p>Emitido: {{ cert.issueDate | date }}</p>
        <button (click)="download(cert.id)">
          <i class="pi pi-download"></i> Baixar
        </button>
      </div>
    </div>
  `
})
export class CertificatesComponent implements OnInit {
  certificates$: Observable<Certificate[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.certificates$ = this.store.select(CertificatesSelectors.certificatesSortedByDate);
    this.loading$ = this.store.select(CertificatesSelectors.loading);
    this.error$ = this.store.select(CertificatesSelectors.error);
  }

  ngOnInit(): void {
    // Get student ID from your auth/student state
    const studentId = 'your-student-id';
    this.store.dispatch(CertificatesActions.loadCertificates({ studentId }));
  }

  download(certificateId: string): void {
    this.store.dispatch(CertificatesActions.downloadCertificate({ certificateId }));
  }
}
```

### In the Home Page Component

To show certificate count on the home page:

```typescript
// In home-page.component.ts
import { CertificatesSelectors } from '@core/state/certificates/certificates.selectors';

export class HomePageComponent implements OnInit {
  certificatesCount$: Observable<number>;

  constructor(private store: Store) {
    // ... existing code
    this.certificatesCount$ = this.store.select(CertificatesSelectors.certificatesCount);
  }

  ngOnInit(): void {
    // Load certificates
    const student = // get from student$ observable
    if (student?.id) {
      this.store.dispatch(CertificatesActions.loadCertificates({ 
        studentId: student.id 
      }));
    }
  }
}
```

## Available Selectors

```typescript
CertificatesSelectors.certificates              // All certificates
CertificatesSelectors.certificatesSortedByDate  // Sorted by issue date (newest first)
CertificatesSelectors.selectedCertificate       // Currently selected certificate
CertificatesSelectors.loading                   // Loading state
CertificatesSelectors.error                     // Error message
CertificatesSelectors.hasCertificates           // Boolean: has any certificates
CertificatesSelectors.certificatesCount         // Number of certificates
```

## Available Actions

```typescript
// Load certificates
CertificatesActions.loadCertificates({ studentId })

// Select a certificate
CertificatesActions.selectCertificate({ certificate })
CertificatesActions.clearSelectedCertificate()

// Download certificate
CertificatesActions.downloadCertificate({ certificateId })

// Clear state
CertificatesActions.clearError()
CertificatesActions.clearCertificates()
```

## API Integration

The service is configured to work with your existing API setup:

### Endpoints:
1. **Get Student Certificates**
   - URL: `${environment.apiUrl}/certificates/student/{studentId}`
   - Method: GET
   - Response: `ApiResponse<Certificate[]>`

2. **Download Certificate PDF**
   - URL: `${environment.apiUrl}/certificates/download/{certificateId}`
   - Method: GET
   - Response: PDF file (Blob/bytes)
   - Auto-download: The effect automatically creates a download link and triggers the download

### Features:
- Uses the existing `ApiResponse<T>` wrapper for data endpoints
- Handles binary PDF response for download endpoint
- Automatic error handling in effects
- Downloads PDF directly to user's device

## Features

✅ Full NgRx state management  
✅ Automatic certificate download (PDF)  
✅ Loading and error states  
✅ Sorted by date selector  
✅ Type-safe with TypeScript  
✅ Follows existing app patterns  
✅ Integrated with app state  

## Next Steps

1. Update the existing `CerticatesComponent` to use this new state management
2. Add certificate badges/icons to the home page
3. Add certificate preview modal
4. Add filtering by level
5. Add search functionality
