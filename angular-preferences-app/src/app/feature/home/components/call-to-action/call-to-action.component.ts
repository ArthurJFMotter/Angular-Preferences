import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DynamicModalComponent } from '../../../../shared/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss'],
})
export class CallToActionComponent {

}
