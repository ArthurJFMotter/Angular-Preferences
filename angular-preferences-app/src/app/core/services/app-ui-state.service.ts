import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppUiStateService {
  // Default to true so users see it immediately
  readonly showQuickFab = signal<boolean>(true);

  constructor() {
    // Load from local storage
    try {
      const saved = localStorage.getItem('app-ui-state');
      if (saved) {
        this.showQuickFab.set(JSON.parse(saved).showQuickFab);
      }
    } catch {}

    // Auto-save on changes
    effect(() => {
      localStorage.setItem('app-ui-state', JSON.stringify({
        showQuickFab: this.showQuickFab()
      }));
    });
  }
}