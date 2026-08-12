import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-cta',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss',
})
export class CallToActionComponent {
  private modals = inject(ModalService);

  openDocs(): void {
    this.modals.showDocs();
  }
}
