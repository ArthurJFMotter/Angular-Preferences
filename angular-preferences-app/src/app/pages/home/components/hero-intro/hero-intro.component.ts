import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from 'ng-preferences';
import { RouterService } from 'ng-preferences';
import { DynamicModalComponent } from '../../../../components/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-hero-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-intro.component.html',
  styleUrls: ['./hero-intro.component.scss'],
})
export class HeroIntroComponent {
  private modalService = inject(ModalService);
  routerService = inject(RouterService);

  goToConfig() {
    this.routerService.navigateTo('/configurations');
  }

  openDocs() {
    this.modalService.openDocumentationModal(DynamicModalComponent);
  }
}
