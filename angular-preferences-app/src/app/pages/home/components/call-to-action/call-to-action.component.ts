import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from 'ng-preferences';
import { RouterService } from 'ng-preferences';
import { DynamicModalComponent } from '../../../../components/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss'],
})
export class CallToActionComponent {
  private modalService = inject(ModalService);
  routerService = inject(RouterService);

  goToConfig() {
    this.routerService.navigateTo('/configurations');
  }

  openDocs() {
    this.modalService.openDocumentationModal(DynamicModalComponent);
  }
}
