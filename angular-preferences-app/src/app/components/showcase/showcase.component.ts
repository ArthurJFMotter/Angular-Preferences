import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all the Material modules we're now showcasing
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// NEW: Import MatDialog and the new dialog component
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component'; // Adjust path if needed

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule // NEW: Add MatDialogModule here
  ],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {
  
  isLoading: boolean = false;
  isImageVisible: boolean = false;

  // NEW: Inject the MatDialog service in the constructor
  constructor(public dialog: MatDialog) {}

  toggleImage(): void {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isImageVisible = !this.isImageVisible;
      this.isLoading = false;
    }, 750);
  }

  // NEW: Method to open the dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(ShowcaseDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      autoFocus: 'dialog', // Good for accessibility
    });

    // You can optionally subscribe to the afterClosed event
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:', result);
    });
  }
}