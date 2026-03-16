import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SmartTooltipDirective } from 'ng-preferences';
import { TooltipConfig } from 'ng-preferences';
import { PreferencesService } from 'ng-preferences';

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
  protected preferencesService = inject(PreferencesService);

  @Input({ required: true }) message!: string;
  
  get config(): TooltipConfig {
    return {
      message: this.message,
      type: 'explanation',
      position: 'right',
      enableTTS: true
    };
  }
}
