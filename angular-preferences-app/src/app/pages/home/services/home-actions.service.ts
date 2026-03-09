import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HomeActionsService {
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  navigateToSettings(): void {
    this.router.navigate(['/configurations']);
  }

  handleDocumentation(): void {
    this.snackbarService.info('Documentation is in the works, and will be added soon.');
  }
}