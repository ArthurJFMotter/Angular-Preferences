import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/snackbar.model';
import { SnackbarActionComponent } from './components/snackbar-action/snackbar-action.component';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SnackbarActionComponent,
  ],
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
})
export class CustomSnackbarComponent {
  public snackBarRef = inject(MatSnackBarRef);
  public data = inject<SnackbarData>(MAT_SNACK_BAR_DATA);

  getIcon(): string {
    return this.data.icon || 'info';
  }

  handleAction(): void {
    this.snackBarRef.dismissWithAction();
  }

  handleDismiss(): void {
    this.snackBarRef.dismiss();
  }
}
