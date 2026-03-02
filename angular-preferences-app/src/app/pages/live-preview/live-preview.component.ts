import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PreferencesService } from '../../services/preferences.service';
import { ThemeService } from '../../services/theme.service';
import { DensityService } from '../../services/density.service';
import { ShapeService } from '../../services/shape.service';
import { TypographyService } from '../../services/typography.service';
import { SnackbarService } from '../../services/snackbar.service';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  status: 'Complete' | 'Pending' | 'Failed';
  timestamp: string;
}

@Component({
  selector: 'app-live-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './live-preview.component.html',
  styleUrls: ['./live-preview.component.scss']
})
export class HomeComponent {
  private prefs = inject(PreferencesService); 
  public themeService = inject(ThemeService);
  public densityService = inject(DensityService);
  public shapeService = inject(ShapeService);
  public typographyService = inject(TypographyService);
  private snackbar = inject(SnackbarService);

  // --- Mock Data ---
  dataSource: AuditLog[] = [
    { id: 'TRX-9921', action: 'Data Export', user: 'alice.m@corp.com', status: 'Complete', timestamp: '10:42 AM' },
    { id: 'TRX-9922', action: 'User Provisioning', user: 'bob.d@corp.com', status: 'Pending', timestamp: '10:45 AM' },
    { id: 'TRX-9923', action: 'Schema Update', user: 'sysadmin', status: 'Failed', timestamp: '10:48 AM' },
    { id: 'TRX-9924', action: 'Report Gen', user: 'sarah.j@corp.com', status: 'Complete', timestamp: '11:00 AM' },
  ];
  displayedColumns: string[] = ['id', 'action', 'user', 'status', 'timestamp'];

  // --- Computed Signals ---
  currentThemeName = computed(() => this.themeService.currentTheme().displayName);
  currentShapeName = computed(() => this.shapeService.activeShape().displayName);
  currentFontName = computed(() => this.typographyService.activeFont().displayName);
  
  tableRowHeight = computed(() => {
    const val = this.densityService.currentDensity().value;
    return `${52 + (val * 8)}px`; 
  });

  // --- Actions ---

  testNotification(type: 'success' | 'warning' | 'error' | 'info') {
    const placement = this.themeService.notificationPlacement();
    const msg = `This is a ${type.toUpperCase()} alert appearing at ${placement}.`;
    
    switch(type) {
      case 'success': this.snackbar.success('Operation completed successfully.'); break;
      case 'warning': this.snackbar.warning('System load is currently high (82%).'); break;
      case 'error': this.snackbar.error('Connection timeout to database node 3.'); break;
      case 'info': this.snackbar.show(msg, 'info', 'DISMISS'); break;
    }
  }
}