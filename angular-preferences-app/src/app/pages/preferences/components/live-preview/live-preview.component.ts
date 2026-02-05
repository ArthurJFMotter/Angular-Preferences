// src/app/pages/preferences/components/live-preview.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-live-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="sticky-wrapper">
      <h2 class="preview-label">Live Preview</h2>
      <mat-card class="preview-card">
        <mat-card-header>
          <div mat-card-avatar class="dummy-avatar">JD</div>
          <mat-card-title>Project Dashboard</mat-card-title>
          <mat-card-subtitle>Active user session</mat-card-subtitle>
        </mat-card-header>
        <div class="image-container">
          <!-- Using a placeholder or the same image from the original -->
          <img src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Preview Image">
        </div>
        <mat-card-content>
          <p class="preview-text">
            This card reflects your current settings.
            Notice how the <strong>font</strong>, <strong>spacing</strong>,
            and <strong>corner roundness</strong> change instantly.
          </p>
          <div class="dummy-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Enter comment</mat-label>
              <input matInput placeholder="Type here...">
            </mat-form-field>
          </div>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button (click)="onPreviewCancel()">Cancel</button>
          <button mat-flat-button color="primary" (click)="onPreviewSubmit()">Submit</button>
        </mat-card-actions>
      </mat-card>

      <div class="mini-widgets">
        <div class="widget">
          <span>Status</span>
          <button mat-mini-fab color="accent" (click)="onPreviewStatus()">
            <mat-icon>check</mat-icon>
          </button>
        </div>
        <div class="widget">
          <span>Alerts</span>
          <button mat-mini-fab color="warn" (click)="onPreviewAlert()">
            <mat-icon>priority_high</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Desktop Only Sticky Behavior */
    @media (min-width: 960px) {
      .sticky-wrapper {
        position: sticky; position: -webkit-sticky; top: 2rem;
        display: flex; flex-direction: column; gap: 1rem;
        transition: top 0.3s ease;
      }
    }
    .preview-label {
      font-size: 1rem; font-weight: 500; color: var(--mat-sys-primary);
      margin: 0; padding-left: 0.75rem; border-left: 3px solid var(--mat-sys-primary);
    }
    .preview-card { border-radius: min(var(--app-border-radius), 28px) !important; overflow: hidden; }
    .image-container { width: 100%; height: 180px; overflow: hidden; border-radius: 0; }
    .image-container img { width: 100%; height: 100%; object-fit: cover; }
    .dummy-avatar {
      background: var(--mat-sys-primary-container); color: var(--mat-sys-on-primary-container);
      display: flex; align-items: center; justify-content: center;
    }
    .preview-text { margin-bottom: 1.5rem; line-height: 1.5; color: var(--mat-sys-on-surface-variant); }
    .dummy-form {
      background: var(--mat-sys-surface-container-high); padding: 1rem;
      border-radius: min(calc(var(--app-border-radius) / 2), 14px);
    }
    .full-width { width: 100%; }
    .mini-widgets { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .widget {
      background: var(--mat-sys-surface); border: 1px solid var(--mat-sys-outline-variant);
      border-radius: min(var(--app-border-radius), 28px); padding: 1rem;
      display: flex; align-items: center; justify-content: space-between;
    }
    .widget span { font-weight: 500; font-size: 0.9rem; }
  `]
})
export class LivePreviewComponent {
  private snackbarService = inject(SnackbarService);
  // Demo interactions
  onPreviewSubmit() { this.snackbarService.success('Project dashboard updated successfully!', 'VIEW'); }
  onPreviewCancel() { this.snackbarService.info('Action cancelled. No changes were made.'); }
  onPreviewStatus() { this.snackbarService.warning('All main systems operational', 'OK'); }
  onPreviewAlert() { this.snackbarService.error('Connection lost! Retrying...', 'RETRY'); }
}