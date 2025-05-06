import {createFeatureSelector, createSelector} from "@ngrx/store";
import {userProfileFeatureKey, UserProfileState} from "./user-profile.actions";

const selectUserProfile = createFeatureSelector<UserProfileState>(userProfileFeatureKey);


export const userProfileSelectors = {

  userProfile: createSelector(selectUserProfile, (state: UserProfileState) => state.userProfile),
  loading: createSelector(selectUserProfile, (state: UserProfileState) => state.isLoading),
  error: createSelector(selectUserProfile, (state: UserProfileState) => state.error),
};
