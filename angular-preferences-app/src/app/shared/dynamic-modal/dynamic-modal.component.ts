import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalData, ModalChecklistOption, ModalAction } from '../../core/models/modal.model';

@Component({
  selector: 'app-dynamic-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
})
export class DynamicModalComponent {
  private readonly dialogRef = inject(MatDialogRef<DynamicModalComponent>);
  readonly data: ModalData = inject(MAT_DIALOG_DATA);

  localChecklist: ModalChecklistOption[] = this.data.checklist 
    ? this.data.checklist.map(c => ({ ...c })) 
    : [];

  handleAction(action: ModalAction): void {
    if (action.returnsChecklist) {
      this.dialogRef.close(this.localChecklist);
    } else {
      this.dialogRef.close(action.value);
    }
  }
}