import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import modules for the dialog and its contents
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-showcase-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule
  ],
  templateUrl: './showcase-dialog.component.html',
  styleUrls: ['./showcase-dialog.component.scss']
})
export class ShowcaseDialogComponent {
  // You can inject MatDialogRef to programmatically close the dialog
  constructor(public dialogRef: MatDialogRef<ShowcaseDialogComponent>) {}
}