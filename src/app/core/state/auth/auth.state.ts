import {UserToken} from "../../models/userToken";
import {User} from "../../models/User";


/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  authResponse: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any | null;
}

/**
 * Initial authentication state
 */
export const initialAuthState: AuthState = {
  user: null,
  authResponse: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
