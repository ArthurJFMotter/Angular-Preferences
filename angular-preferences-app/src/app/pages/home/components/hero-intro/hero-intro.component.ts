import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-hero-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-intro.component.html',
  styleUrls: ['./hero-intro.component.scss'],
})
export class HeroIntroComponent {
  private router = inject(Router);
  snackbarService = inject(SnackbarService);

  navigateToSettings() {
    this.router.navigate(['/configurations']);
  }

  // temporary function, remove when documentation is ready
  handleDocumentation() {
    this.snackbarService.info('Documentation is on the works, and will be added soon.');
  }
}
