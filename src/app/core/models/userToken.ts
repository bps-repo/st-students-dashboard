/**
 * User interface
 */
export interface UserToken {
  id: string;
  email: string;
  name: string;
  role: string;
  sub?: string;
}
