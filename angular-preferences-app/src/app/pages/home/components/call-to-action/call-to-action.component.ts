import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../../../services/modal.service';
import { RouterService } from '../../../../services/router.service';

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
    this.modalService.openDocumentationModal();
  }
}
