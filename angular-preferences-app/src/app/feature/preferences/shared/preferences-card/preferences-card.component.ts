import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preferences-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './preferences-card.component.html',
  styleUrl: './preferences-card.component.scss',
})
export class PreferencesCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) icon!: string;
}