import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './features-grid.component.html',
  styleUrls: ['./features-grid.component.scss'],
})
export class FeaturesGridComponent {}
