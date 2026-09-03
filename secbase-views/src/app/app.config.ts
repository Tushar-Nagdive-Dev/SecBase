import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {credentialsInterceptor} from './core/interceptors/credentials.interceptor';
import { loadingInterceptor } from '@core/interceptors/loading.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([credentialsInterceptor, loadingInterceptor])
    ),
    provideAnimationsAsync()
  ]
};
