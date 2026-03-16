import { Component, inject } from '@angular/core';
import { RouterService } from 'ng-preferences';
import { ModalService } from 'ng-preferences';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports:[],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private routerService = inject(RouterService);
  private modalService = inject(ModalService);

  openExternalLink(url: string): void {
    this.routerService.navigateExternal(url, true);
  }

  openLicense() {
    this.modalService.openLicenseModal(DynamicModalComponent);
  }
}