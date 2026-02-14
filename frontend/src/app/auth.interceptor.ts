import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from local storage (ensure the key matches your login service)
  const token = localStorage.getItem('auth_token');

  // If the token exists, clone the request and add the Authorization header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // If no token, just send the original request
  return next(req);
};