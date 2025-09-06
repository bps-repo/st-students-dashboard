export interface ContractInstallment {
  id: string;
  installmentNumber: number;
  dueDate: string; // ISO date string
  amount: number;
  status: 'PENDING_PAYMENT' | 'PAID' | 'OVERDUE' | string;
}

export interface ContractLevel {
  id: string;
  name: string;
  levelId: string;
  productId?: string;
  duration?: number;
  levelPrice?: number;
  courseMaterialPrice?: number;
  levelOrder?: number;
  offerType?: string;
  registrationFeeType?: string;
  finalLevelPrice?: number;
  finalCourseMaterialPrice?: number;
  courseMaterialPaid?: boolean;
  includeCourseMaterial?: boolean;
  includeRegistrationFee?: boolean;
  status?: string;
  contractType?: string;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string | null;
}

export interface StudentContract {
  id: string;
  startDate: string; // ISO date
  endDate: string;   // ISO date
  amount: number;
  discountPercent: number;
  status: string;
  contractType: string;
  levels: ContractLevel[];
  installments: ContractInstallment[];
  notes?: string | null;
}
