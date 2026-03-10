import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snackbar-action',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './snackbar-action.component.html',
  styleUrls: ['./snackbar-action.component.scss'],
})
export class SnackbarActionComponent {
  @Input() action?: string;
  @Input() forceHighContrast = false;
  @Output() actionClick = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  onActionClick(): void {
    this.actionClick.emit();
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
