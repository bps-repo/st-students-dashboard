import {UserProfile} from "../../dtos/user-profile";
import {createActionGroup, emptyProps, props} from "@ngrx/store";

export const userProfileFeatureKey = 'userProfile';

export interface UserProfileState {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: any | null;
}


export const initialUserProfileState: UserProfileState = {
  userProfile: null,
  isLoading: false,
  error: null,
};


export const userProfileActions = createActionGroup(
  {
    source: userProfileFeatureKey,
    events: {
      getUserProfile: emptyProps(),
      getUserProfileSuccess: props<{ userProfile: UserProfile }>(),
      getUserProfileFailure: props<{ error: any }>(),

      updateUserProfile: props<{ userProfile: UserProfile }>(),
      updateUserProfileSuccess: props<{ userProfile: UserProfile }>(),
      updateUserProfileFailure: props<{ error: any }>(),

      clearError: emptyProps(),

      clearUserProfile: emptyProps(),
    },
  }
)
