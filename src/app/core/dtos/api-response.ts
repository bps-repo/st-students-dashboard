export interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T | T[];
  error?: any;
  timestamp?: string;
  path?: string;
  metadada?: any;
}
