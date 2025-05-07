import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthActions} from "../state/auth/authActions";

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  const router = inject(Router)
  const store$ = inject(Store)

  if (!token || token === 'undefined') {
    router.navigate(['/auth/login']);
    return false;
  }

  store$.dispatch(AuthActions.initAuth());
  return true;
};
