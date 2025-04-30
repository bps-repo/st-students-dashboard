import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {authActions} from "../state/auth/auth.actions";

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  const router = inject(Router)
  const store$ = inject(Store)

  if (!token || token === 'undefined') {
    router.navigate(['/auth/login']);
    return false;
  }

  store$.dispatch(authActions.initAuth());
  return true;
};
