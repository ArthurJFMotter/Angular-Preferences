import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalAction, ModalConfig } from 'ng-preferences';

@Component({
  selector: 'app-dynamic-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
})
export class DynamicModalComponent {
  public data: ModalConfig = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DynamicModalComponent>);

  handleAction(action: ModalAction): void {
    action.action();
    this.dialogRef.close();
  }
}
