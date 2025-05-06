export interface User {
  id?: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
