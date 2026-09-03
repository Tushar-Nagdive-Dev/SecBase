import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ROUTES_PATHS } from '@core/constants/route.constants';
import { AuthStateService } from '@core/services/auth-state.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthStateService);
  const router = inject(Router);

  if(authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([ROUTES_PATHS.AUTH.SIGNING]);
};
