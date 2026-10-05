import { Injectable, signal, effect } from '@angular/core';
import { DrawerConfig } from '../models/drawer.model';

export type WidgetMode = 'fab' | 'drawer' | 'none';

@Injectable({ providedIn: 'root' })
export class AppUiStateService {
  readonly widgetMode = signal<WidgetMode>('fab');

  readonly fabMenus = signal<Record<string, boolean>>({
    color: true,
    typography: true,
    layout: true,
    notifications: true,
    accessibility: true,
  });

  readonly drawerConfig = signal<DrawerConfig>({
    mode: 'over',
    position: 'end',
    hasBackdrop: true,
  });

  constructor() {
    try {
      const saved = localStorage.getItem('app-ui-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.widgetMode !== undefined)
          this.widgetMode.set(parsed.widgetMode);
        else if (parsed.showQuickFab !== undefined)
          this.widgetMode.set(parsed.showQuickFab ? 'fab' : 'none');

        if (parsed.fabMenus) this.fabMenus.set(parsed.fabMenus);
        if (parsed.drawerConfig) this.drawerConfig.set(parsed.drawerConfig);
      }
    } catch {}

    effect(() => {
      localStorage.setItem(
        'app-ui-state',
        JSON.stringify({
          widgetMode: this.widgetMode(),
          fabMenus: this.fabMenus(),
          drawerConfig: this.drawerConfig(),
        }),
      );
    });
  }
}
