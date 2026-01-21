export interface EmployeePersonalInfo {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  identificationNumber?: string;
  photoUrl?: string;
  gender?: string;
  birthdate?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface Permission {
  id: string;
  name: string;
  key: string;
  description: string;
  children: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface EmployeeWorkInfo {
  centerId: string;
  centerName: string;
  hiringDate: string;
  resignationDate?: string;
  wage: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Employee {
  createdAt: string;
  updatedAt: string;
  id: string;
  personalInfo: EmployeePersonalInfo;
  role: Role;
  allPermissions: Permission[];
  additionalPermissions: Permission[];
  workInfo: EmployeeWorkInfo;
  accountStatus: 'ACTIVE' | 'INACTIVE';
}

export interface EmployeesPagedResponse {
  content: Employee[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  number: number;
  empty: boolean;
}
