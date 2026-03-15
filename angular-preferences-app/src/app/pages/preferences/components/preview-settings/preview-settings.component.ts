import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // 👈 ADDED
import { SnackbarService } from '../../../../services/snackbar.service';
import { SettingsCardWrapperComponent } from '../settings-card-wrapper/settings-card-wrapper.component';

@Component({
  selector: 'app-preview-settings',
  standalone: true,
  imports:[
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatProgressSpinnerModule, 
    SettingsCardWrapperComponent
  ],
  templateUrl: './preview-settings.component.html',
  styleUrls: ['./preview-settings.component.scss']
})
export class PreviewSettingsComponent {
  private snackbarService = inject(SnackbarService);
  
  public isImageLoaded = signal<boolean>(false);

  onImageLoad() {
    this.isImageLoaded.set(true);
  }

  onPreviewSubmit() {
    this.snackbarService.success('Project dashboard updated successfully!', 'VIEW');
  }

  onPreviewCancel() {
    this.snackbarService.info('Action cancelled. No changes were made.');
  }

  onPreviewStatus() {
    this.snackbarService.warning('All main systems operational', 'OK');
  }

  onPreviewAlert() {
    this.snackbarService.error('Connection lost! Retrying...', 'RETRY');
  }
}