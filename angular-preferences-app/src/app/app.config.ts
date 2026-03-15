import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSnackbarConfig } from './providers/snackbar.provider';
import { provideModal } from './providers/modal.provider';

export const appConfig: ApplicationConfig = {
  providers:[
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      // disable in DEV, mantain in PRODUCTION
      withViewTransitions({ skipInitialTransition: true }),
    ),
    provideAnimationsAsync(), 
    provideModal(),
    provideSnackbarConfig({
      defaultDuration: 5000,
      errorDuration: 8000,
      defaultPlacement: 'top-center',
      icons: {
        success: 'done',
        error: 'cancel',
      },
    }),
  ],
};