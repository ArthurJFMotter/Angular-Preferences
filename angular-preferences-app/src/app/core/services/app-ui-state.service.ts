import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppUiStateService {
  readonly showQuickFab = signal<boolean>(true);
  
  // Tracks which domains to show in the FAB
  readonly fabMenus = signal<Record<string, boolean>>({
    color: true,
    typography: true,
    layout: true,
    notifications: true,
    accessibility: true
  });

  constructor() {
    try {
      const saved = localStorage.getItem('app-ui-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.showQuickFab !== undefined) this.showQuickFab.set(parsed.showQuickFab);
        if (parsed.fabMenus) this.fabMenus.set(parsed.fabMenus);
      }
    } catch {}

    effect(() => {
      localStorage.setItem('app-ui-state', JSON.stringify({
        showQuickFab: this.showQuickFab(),
        fabMenus: this.fabMenus()
      }));
    });
  }
}