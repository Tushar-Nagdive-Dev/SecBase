import { Routes } from '@angular/router';
import { SecbaseHome } from './components/secbase-home/secbase-home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from '@core/guards/auth-guard';
import { SecBaseAppConstants } from '@core/constants/app.constants';
import { ROUTES_PATHS } from '@core/constants/route.constants';

export const routes: Routes = [
  {
      path: '',
      component: SecbaseHome,
      title: SecBaseAppConstants.TITLES.SECBASE_HOME
  },
  {
    path: ROUTES_PATHS.AUTH.SIGNING, 
    component: Login,
    title: SecBaseAppConstants.TITLES.SIGN_IN
  },
  {
    path: ROUTES_PATHS.AUTH.SIGNUP,
    component: Register,
    title: SecBaseAppConstants.TITLES.SIGN_UP
  },
  {
    path: ROUTES_PATHS.SECBASE_VIEW, // Now resolves to 'dashboard'
    canActivate: [authGuard],
    loadComponent: () => import('./components/sec-base-views/sec-base-views').then(m => m.SecBaseViews),
    title: SecBaseAppConstants.TITLES.SECBASE_VIEWS
  },
  {
    path: ROUTES_PATHS.AUTH.LOGIN,
    redirectTo: ROUTES_PATHS.AUTH.SIGNING,
    pathMatch: SecBaseAppConstants.FULL 
  },
  { 
    path: ROUTES_PATHS.AUTH.REGISTER,
    redirectTo: ROUTES_PATHS.AUTH.SIGNUP,
    pathMatch: SecBaseAppConstants.FULL
  },
  {
    path: SecBaseAppConstants.ANY, 
    redirectTo: ROUTES_PATHS.AUTH.SIGNING,
    pathMatch: SecBaseAppConstants.FULL
  }
];