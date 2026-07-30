import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { DynamicModalComponent } from '../../shared/dynamic-modal/dynamic-modal.component';
import { ModalData } from '../models/modal.model';

// --- SERVICE ---
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dialog = inject(MatDialog);

  /**
   * Spawns a highly customizable dynamic modal.
   * @returns An Observable containing the `value` of the clicked ModalAction, or undefined if dismissed.
   */
  open<T = any>(data: ModalData, config?: MatDialogConfig): Observable<T | undefined> {
    const dialogRef = this.dialog.open(DynamicModalComponent, {
      width: '400px',
      maxWidth: '90vw',
      data,
      ...config // Allows caller to override width, disableClose, etc.
    });

    return dialogRef.afterClosed();
  }

  // =========================================================
  // CONVENIENCE HELPERS
  // =========================================================

  /** Quick "OK" Alert */
  alert(title: string, message: string, icon?: string): Observable<boolean> {
    return this.open<boolean>({
      title,
      message,
      icon,
      showCloseButton: false,
      actions: [
        { label: 'OK', value: true, isPrimary: true }
      ]
    }).pipe(map(result => !!result)); 
  }

  /** Quick "Confirm / Cancel" Dialog */
  confirm(title: string, message: string, icon?: string): Observable<boolean> {
    return this.open<boolean>({
      title,
      message,
      icon,
      showCloseButton: false,
      actions: [
        { label: 'Cancel', value: false },
        { label: 'Confirm', value: true, isPrimary: true, color: 'primary' }
      ]
    }).pipe(map(result => !!result)); 
  }

  /** Dangerous "Delete / Cancel" Dialog */
  confirmDanger(title: string, message: string, icon: string = 'warning'): Observable<boolean> {
    return this.open<boolean>({
      title,
      message,
      icon,
      showCloseButton: false,
      actions: [
        { label: 'Cancel', value: false },
        { label: 'Delete', value: true, isPrimary: true, color: 'warn' }
      ]
    }).pipe(map(result => !!result)); 
  }
}