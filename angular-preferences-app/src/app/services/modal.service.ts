import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicModalComponent } from '../components/dynamic-modal/dynamic-modal.component';
import { ModalConfig } from '../models/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialog = inject(MatDialog);

  // --- CORE GENERIC METHOD ---
  openModal(config: ModalConfig) {
    return this.dialog.open(DynamicModalComponent, {
      data: config,
      autoFocus: 'first-tabbable',
      panelClass: 'app-dynamic-modal-pane'
    });
  }

  // --- PRE-CONFIGURED APP MODALS ---
  openDocumentationModal() {
    return this.openModal({
      title: 'Documentation',
      icon: 'menu_book',
      message: 'The documentation is currently being written and will be available in a future update. Stay tuned!',
      actions:[
        {
          label: 'Got it!',
          color: 'primary',
          isPrimary: true,
          action: () => console.log('User acknowledged documentation status.')
        }
      ]
    });
  }
}