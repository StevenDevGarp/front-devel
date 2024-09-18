import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (!req.url.endsWith('/auth/login') && !req.url.endsWith('/auth/register') ) {  // Excluir la URL de login
    const authToken = localStorage.getItem('authToken');
    console.log('authToken', authToken);
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next(authReq);
    }
  }
  return next(req);
};
