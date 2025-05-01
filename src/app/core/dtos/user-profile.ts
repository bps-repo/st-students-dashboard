export interface UserProfile {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  identificationNumber: string;
  birthDate: Date;
  photo: string;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
}
