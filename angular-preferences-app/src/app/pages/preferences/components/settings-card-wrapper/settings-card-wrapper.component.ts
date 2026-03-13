import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HelpButtonComponent } from '../../../../components/help-button/help-button.component';

@Component({
  selector: 'app-settings-card-wrapper',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, HelpButtonComponent],
  templateUrl: './settings-card-wrapper.component.html',
  styleUrls: ['./settings-card-wrapper.component.scss'],
})
export class SettingsCardWrapperComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) headerTitle!: string;
  @Input({ required: true }) helpMessage!: string;
}
