import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { importProvidersFrom } from '@angular/core';

export const provideModal = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(MatDialogModule),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        disableClose: false, 
        width: '100%',
        maxWidth: '500px',
      }
    }
  ]);
};