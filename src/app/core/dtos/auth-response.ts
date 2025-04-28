export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number; // Token expiration time in seconds
}
