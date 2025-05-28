import { httpInterceptorProviders } from '@Core/interceptor';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, inject, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  NavigationError,
  provideRouter,
  Router,
  RouterFeatures,
  TitleStrategy,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withNavigationErrorHandler
} from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { AppPageTitleStrategy } from './app-page-title-strategy';
import { appRoutes } from './app.routes';

const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(),
  withNavigationErrorHandler((e: NavigationError) => {
    const router = inject(Router);
    if (e.error.status === 403) {
      router.navigate(['/auth/access']);
    } else if (e.error.status === 404) {
      router.navigate(['/notfound']);
    } else if (e.error.status === 401) {
      router.navigate(['/auth/login']);
    } else {
      router.navigate(['/auth/error']);
    }
  })
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation(),
      ...routerFeatures
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),

    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,

    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: TitleStrategy, useClass: AppPageTitleStrategy }
  ]
};
