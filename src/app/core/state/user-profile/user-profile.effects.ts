import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap} from "rxjs/operators";
import {userProfileActions} from "./user-profile.actions";
import {map, of} from "rxjs";
import {UserProfileService} from "../../services/user-profile.service";


@Injectable()
export class UserProfileEffects {
  actions$ = inject(Actions);
  userProfileService = inject(UserProfileService);

  constructor() {
  }

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      exhaustMap(() =>
        this.userProfileService.getUserProfile().pipe(
          map((userProfile) => userProfileActions.getUserProfileSuccess({userProfile: userProfile})),
          catchError((error) => of(userProfileActions.getUserProfileFailure({error})))
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.updateUserProfile),
      exhaustMap(({userProfile}) =>
        this.userProfileService.updateUserProfile(userProfile).pipe(
          map((userProfile) => userProfileActions.updateUserProfileSuccess({userProfile: userProfile})),
          catchError((error) => of(userProfileActions.updateUserProfileFailure({error})))
        )
      )
    )
  );
}
