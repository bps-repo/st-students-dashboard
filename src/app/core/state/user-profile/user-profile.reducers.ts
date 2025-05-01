import {createFeature, createReducer, on} from "@ngrx/store";
import {initialUserProfileState, userProfileActions, userProfileFeatureKey} from "./user-profile.actions";

export const userProfileFeature = createFeature(
  {
    name: userProfileFeatureKey,
    reducer: createReducer(
      initialUserProfileState,
      on(userProfileActions.getUserProfile, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      })),
      on(userProfileActions.getUserProfileSuccess, (state, {userProfile}) => ({
        ...state,
        userProfile,
        isLoading: false,
      })),
      on(userProfileActions.getUserProfileFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })),
      on(userProfileActions.updateUserProfile, (state) => ({
        ...state,
        isLoading: true,
      })),
      on(userProfileActions.updateUserProfileSuccess, (state, {userProfile}) => ({
        ...state,
        userProfile: {...state.userProfile, ...userProfile},
        isLoading: false,
      })),
      on(userProfileActions.updateUserProfileFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error,
      })),
      on(userProfileActions.clearError, (state) => ({
        ...state,
        error: null,
      })),

      on(userProfileActions.clearUserProfile, (state) => ({
        ...state,
        userProfile: null,
        isLoading: false,
        error: null,
      })),
    )
  }
)
