import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeActionsService } from '../../services/home-actions.service';

@Component({
  selector: 'app-hero-intro',
  standalone: true,
  imports:[CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-intro.component.html',
  styleUrls:['./hero-intro.component.scss'],
})
export class HeroIntroComponent {
  public homeActions = inject(HomeActionsService);
}