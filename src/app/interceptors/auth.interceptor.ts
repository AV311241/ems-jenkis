import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

   const token = localStorage.getItem('token'); // Replace 'authToken' with your token key if different

   if (token) {
     req = req.clone({
       setHeaders: {
         Authorization: `Bearer ${token}`,
       },
     });
   }
 

   return next(req);

};
