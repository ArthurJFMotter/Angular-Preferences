import { Component, inject, signal, computed, AfterViewInit, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreferencesService } from 'ng-material-preferences';

import { ColorAppearanceComponent } from './components/color-appearance/color-appearance.component';
import { InterfaceLayoutComponent } from './components/interface-layout/interface-layout.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TypographyComponent } from './components/typography/typography.component';
import { VisionFiltersComponent } from './components/vision-filters/vision-filters.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ColorAppearanceComponent,
    TypographyComponent,
    InterfaceLayoutComponent,
    NotificationsComponent,
    VisionFiltersComponent,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
})
export class PreferencesComponent implements AfterViewInit, OnDestroy {
  readonly prefs = inject(PreferencesService);

  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;

  // Dynamically generate the sidebar menu based on active domains
  readonly availableSections = computed(() => {
    const sections = [];
    if (this.prefs.hasColor) sections.push({ id: 'color', icon: 'palette', label: 'Color & Appearance' });
    if (this.prefs.hasTypography) sections.push({ id: 'typography', icon: 'text_fields', label: 'Typography' });
    if (this.prefs.hasLayout) sections.push({ id: 'layout', icon: 'dashboard', label: 'Interface Layout' });
    if (this.prefs.hasNotifications) sections.push({ id: 'notifications', icon: 'notifications', label: 'Notifications' });
    if (this.prefs.hasAccessibility) sections.push({ id: 'accessibility', icon: 'visibility', label: 'Vision Simulator' });
    return sections;
  });

  readonly activeSection = signal<string>('');
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    // Set up the observer to highlight the sidebar link when a section scrolls into view
    this.observer = new IntersectionObserver((entries) => {
      const visibleSection = entries.find(entry => entry.isIntersecting);
      if (visibleSection) {
        this.activeSection.set(visibleSection.target.id);
      }
    }, { rootMargin: '-100px 0px -60% 0px' });

    this.sections.forEach(sec => this.observer?.observe(sec.nativeElement));
    
    if (this.availableSections().length > 0) {
      this.activeSection.set(this.availableSections()[0].id);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const behavior = this.prefs.motionScale() === 0 ? 'instant' : 'smooth';
      el.scrollIntoView({ behavior, block: 'start' });
    }
  }
}