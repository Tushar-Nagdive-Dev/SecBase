/*./src/app/core/interceptors/credentials.interceptor.ts*/
import {HttpInterceptorFn} from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, res) => {
  const secureReq = req.clone({
    withCredentials: true
  });

  return res(secureReq);
}
