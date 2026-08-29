import { Routes } from '@angular/router';
import { Welcome } from './components/welcome/welcome';

export const routes: Routes = [
    {
        path: '',
        component: Welcome
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },
    {
        path: 'auth/register',
        loadComponent: () => import('./components/register/register').then(m => m.Register)
    }
];
