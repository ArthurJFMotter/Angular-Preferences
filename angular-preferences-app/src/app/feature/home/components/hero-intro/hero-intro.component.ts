import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DynamicModalComponent } from '../../../../shared/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-hero-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-intro.component.html',
  styleUrls: ['./hero-intro.component.scss'],
})
export class HeroIntroComponent {

}
