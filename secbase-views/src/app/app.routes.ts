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
    path: ROUTES_PATHS.SECBASE_VIEW, // Now resolves to 'secbase-view'
    canActivate: [authGuard],
    loadComponent: () => import('./components/sec-base-views/sec-base-views').then(m => m.SecBaseViews),
    title: SecBaseAppConstants.TITLES.SECBASE_VIEWS
  },

  // ==========================================
  // ZERO-KNOWLEDGE ENCLAVE ROUTES
  // ==========================================
  {
    path: ROUTES_PATHS.PROFILES.NEW,
    canActivate: [authGuard],
    loadComponent: () => import('./components/profile-creation/profile-creation').then(m => m.ProfileCreation),
    title: SecBaseAppConstants.TITLES.INITIALIZE_ENCLAVE
  },
  {
    path: ROUTES_PATHS.ENCLAVE.LOBBY,
    canActivate: [authGuard],
    loadComponent: () => import('./components/enclave-lobby/enclave-lobby').then(m => m.EnclaveLobby),
    title: SecBaseAppConstants.TITLES.ENCLAVE_LIST
  },
  {
    // Same component as LOBBY, but allows us to auto-select a profile via the URL param
    path: ROUTES_PATHS.ENCLAVE.LOBBY_WITH_PROFILE,
    canActivate: [authGuard],
    loadComponent: () => import('./components/enclave-lobby/enclave-lobby').then(m => m.EnclaveLobby),
    title: SecBaseAppConstants.TITLES.ENCLAVE_LIST
  },
  {
    path: ROUTES_PATHS.ENCLAVE.ITEM_NEW,
    canActivate: [authGuard],
    loadComponent: () => import('./components/credential-creation/credential-creation').then(m => m.CredentialCreation),
    title: SecBaseAppConstants.TITLES.STORE_CREDENTIAL
  },
  {
    path: ROUTES_PATHS.ENCLAVE.ITEM_DETAIL,
    canActivate: [authGuard],
    loadComponent: () => import('./components/credential-details/credential-details').then(m => m.CredentialDetails),
    title: SecBaseAppConstants.TITLES.DECRYPT_SECRET
  },

  // ==========================================
  // REDIRECTS & FALLBACKS
  // ==========================================
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
