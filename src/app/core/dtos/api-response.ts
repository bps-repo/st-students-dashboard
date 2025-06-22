export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  error?: any;
  timestamp?: string;
  path?: string;
  metadata?: [];
}

export interface PagedResponse<T> {
  content: T;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
