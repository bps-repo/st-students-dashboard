import {User} from "../../models/User";
import {UserToken} from "../../models/userToken";


/**
 * Authentication state interface
 */
export interface AuthState {
  userToken: UserToken | null;
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
  userToken: null,
  authResponse: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
