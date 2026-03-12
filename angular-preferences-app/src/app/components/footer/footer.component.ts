import { Component, inject } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { ModalService } from '../../services/modal.service';

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
    this.modalService.openLicenseModal();
  }
}