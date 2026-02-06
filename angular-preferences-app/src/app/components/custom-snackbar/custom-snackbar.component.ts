import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/snackbar.model';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {}

  getIcon(): string {
    if (this.data.icon) return this.data.icon;
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning_amber';
      case 'info': return 'info';
      default: return 'info';
    }
  }
}