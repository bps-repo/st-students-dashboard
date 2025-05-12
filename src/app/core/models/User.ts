export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname:string;
  role: string;
  phone?: string;
  address?: string;
  gender: any;
  dateOfbirth: Date
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
