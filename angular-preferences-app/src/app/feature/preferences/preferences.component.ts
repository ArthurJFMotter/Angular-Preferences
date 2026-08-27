import {
  Component,
  inject,
  signal,
  computed,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  HostListener,
} from '@angular/core';
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
  
  private isClickScrolling = false;
  private scrollTimeout: any;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      if (this.isClickScrolling) return;

      const visibleSection = entries.find(entry => entry.isIntersecting);
      if (visibleSection) {
        this.activeSection.set(visibleSection.target.id);
      }
    }, { rootMargin: '-120px 0px -40% 0px' });

    this.sections.forEach(sec => this.observer?.observe(sec.nativeElement));
    
    if (this.availableSections().length > 0) {
      this.activeSection.set(this.availableSections()[0].id);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    clearTimeout(this.scrollTimeout);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isClickScrolling) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollHeight <= innerHeight) return;

    const isAtBottom = Math.ceil(scrollY + innerHeight) >= scrollHeight - 10;
    
    if (isAtBottom && scrollY > 0) {
      const sections = this.availableSections();
      if (sections.length > 0) {
        this.activeSection.set(sections[sections.length - 1].id);
      }
    }
  }

  scrollTo(id: string) {
    this.isClickScrolling = true;
    this.activeSection.set(id); 

    const el = document.getElementById(id);
    if (el) {
      const behavior = this.prefs.motionScale() === 0 ? 'instant' : 'smooth';
      el.scrollIntoView({ behavior, block: 'start' });
    }

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isClickScrolling = false;
    }, 800);
  }
}