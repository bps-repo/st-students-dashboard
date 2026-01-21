export enum SupportTicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum SupportTicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  requesterId: string;
  requesterName: string;
  assignedToEmployeeId?: string;
  assignedToName?: string;
  responseMessage?: string;
  respondedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketFilters {
  requesterId?: string;
  assignedToId?: string;
  status?: SupportTicketStatus;
}
