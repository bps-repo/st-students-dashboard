import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');


  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }


  if (refreshToken) {
    req = req.clone({
      setHeaders: {
        'x-refresh-token': refreshToken,
      },
    });
  }

  // Log the request details
  return next(req);
};
