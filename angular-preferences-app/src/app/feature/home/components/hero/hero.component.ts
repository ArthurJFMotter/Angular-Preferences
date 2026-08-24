import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../../../core/services/modal.service';
import { MockWindowComponent } from '../mock-window/mock-window.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, MockWindowComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private modals = inject(ModalService);

  openDocs(): void {
    this.modals.showDocs();
  }
}
