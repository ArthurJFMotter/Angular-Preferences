import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; 
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
      withViewTransitions({ skipInitialTransition: true }),
    ),
    provideAnimations(), 
    //custom providers
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