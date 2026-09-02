import { Routes } from '@angular/router';
import { SecbaseHome } from './components/secbase-home/secbase-home';
import {ROUTES_PATHS} from './core';
import {Login} from './components/login/login';
import {Register} from './components/register/register';

export const routes: Routes = [
  {
      path: '',
      component: SecbaseHome,
      title: 'Secbase Home',
  },
  {
    path: ROUTES_PATHS.AUTH.SIGNING,
    component: Login
  },
  {
    path: ROUTES_PATHS.AUTH.SIGNUP,
    component: Register
  }
];
