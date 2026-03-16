import { Injectable, inject, signal } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  // --- STATE SIGNALS ---
  public currentUrl = signal<string>('');
  public previousUrl = signal<string | null>(null);
  public isNavigating = signal<boolean>(false);

  constructor() {
    this.initRouterListeners();
  }

  private initRouterListeners() {
    this.router.events.subscribe(event => {
      // Loading State
      if (event instanceof NavigationStart) {
        this.isNavigating.set(true);
      }
      
      if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isNavigating.set(false);
      }

      // Route Tracking
      if (event instanceof NavigationEnd) {
        this.isNavigating.set(false);
        this.previousUrl.set(this.currentUrl());
        this.currentUrl.set(event.urlAfterRedirects);
      }
    });
  }

  // --- ACTIONS ---

  /** Standard navigation wrapper */
  public navigateTo(path: string | any[], queryParams?: any): void {
    const commands = Array.isArray(path) ? path : [path];
    this.router.navigate(commands, { queryParams });
  }

  /** Navigates to external URL */
  public navigateExternal(url: string, newTab: boolean = true): void {
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  }

  /** Manual scroll controls */
  public scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public scrollToAnchor(anchorId: string): void {
    this.viewportScroller.scrollToAnchor(anchorId);
  }
}