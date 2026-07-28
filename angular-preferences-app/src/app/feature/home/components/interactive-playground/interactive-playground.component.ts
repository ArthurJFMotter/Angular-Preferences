import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-interactive-playground',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './interactive-playground.component.html',
  styleUrls: ['./interactive-playground.component.scss'],
})
export class InteractivePlaygroundComponent {
  
}
