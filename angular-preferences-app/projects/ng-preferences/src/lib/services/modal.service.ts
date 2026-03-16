import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalConfig } from '../models/modal.model';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(MatDialog);
  private themeService = inject(ThemeService);

  // --- CORE GENERIC METHOD ---
  openModal<T>(component: Type<T>, config: ModalConfig) {
    const isReducedMotion = this.themeService.isReducedMotion();

    const dialogConfig: MatDialogConfig = {
      data: config,
      autoFocus: 'first-tabbable',
      panelClass: 'app-dynamic-modal-pane',
      enterAnimationDuration: isReducedMotion ? '0ms' : undefined,
      exitAnimationDuration: isReducedMotion ? '0ms' : undefined,
    };

    return this.dialog.open(component, dialogConfig);
  }

  // --- PRE-CONFIGURED APP MODALS ---
  openDocumentationModal<T>(component: Type<T>) {
    return this.openModal(component, {
      title: 'Documentation',
      icon: 'menu_book',
      message:
        'The documentation is currently being written and will be available in a future update. Stay tuned!',
      actions: [
        {
          label: 'Got it!',
          color: 'primary',
          isPrimary: true,
          action: () => console.log('User acknowledged documentation status.'),
        },
      ],
    });
  }

  openLicenseModal<T>(component: Type<T>) {
    return this.openModal(component, {
      title: 'MIT License',
      icon: 'gavel',
      message:
        'Copyright (c) 2026. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...',
      actions: [
        {
          label: 'I Understand',
          color: 'primary',
          isPrimary: true,
          action: () => console.log('License accepted'),
        },
      ],
    });
  }
}
