import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  const router = inject(Router)
  if (!token || token === 'undefined') {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
