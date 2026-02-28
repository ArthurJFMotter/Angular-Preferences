import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SmartTooltipDirective } from '../../directives/smart-tooltip.directive';
import { TooltipConfig } from '../../models/tooltip.model';

@Component({
  selector: 'app-help-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SmartTooltipDirective,
  ],
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent {
  @Input({ required: true }) message!: string;

  get config(): TooltipConfig {
    return {
      message: this.message,
      type: 'explanation',
      position: 'right',
      enableTTS: true,
    };
  }
}
