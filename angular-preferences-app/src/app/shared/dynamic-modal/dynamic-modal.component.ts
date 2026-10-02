import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ModalData,
  ModalChecklistOption,
  ModalSelect,
  ModalToggle,
  ModalAction,
} from '../../core/models/modal.model';

@Component({
  selector: 'app-dynamic-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
})
export class DynamicModalComponent {
  private readonly dialogRef = inject(MatDialogRef<DynamicModalComponent>);
  readonly data: ModalData = inject(MAT_DIALOG_DATA);

  // Deep copy states
  localChecklist: ModalChecklistOption[] = this.data.checklist
    ? JSON.parse(JSON.stringify(this.data.checklist))
    : [];
  localSelects: ModalSelect[] = this.data.selects
    ? JSON.parse(JSON.stringify(this.data.selects))
    : [];
  localToggles: ModalToggle[] = this.data.toggles
    ? JSON.parse(JSON.stringify(this.data.toggles))
    : [];

  handleAction(action: ModalAction): void {
    if (action.returnsPayload) {
      // Return a combined payload
      this.dialogRef.close({
        checklist: this.localChecklist,
        selects: this.localSelects,
        toggles: this.localToggles,
      });
    } else {
      this.dialogRef.close(action.value);
    }
  }
}
