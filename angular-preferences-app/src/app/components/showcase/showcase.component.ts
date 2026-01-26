import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';

interface AnimalOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {

  isLoading: boolean = false;
  isImageVisible: boolean = false;

  isGeneratingText: boolean = false;
  personName: string = '';
  animalType: string = '';
  generatedText: string = '';
  hasError: boolean = false;

  public readonly animalOptions: AnimalOption[] = [
    { value: 'none', label: 'None' },
    { value: 'bird', label: 'Bird' },
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'fish', label: 'Fish' },
    { value: 'other', label: 'Other' },
  ];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openSnackBar(messageKey: string, actionKey: string) {
    let message: string;
    let action: string;

    if (messageKey === 'You liked this!') {
      message = 'You liked this!';
    } else {
      message = 'You bookmarked this!';
    }

    if (actionKey === 'Close') {
      action = 'Close';
    } else {
      action = actionKey;
    }

    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ShowcaseDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      autoFocus: 'dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:', result);
    });
  }

  generateText(): void {
    if (!this.personName || !this.animalType || this.animalType === 'none') {
      this.generatedText = 'Please provide a name and select a pet.';
      this.hasError = true;
      return;
    }

    this.isGeneratingText = true;
    this.generatedText = '';

    setTimeout(() => {
      const selectedOption = this.animalOptions.find(opt => opt.value === this.animalType);

      if (this.animalType === 'other' || !selectedOption) {
        this.generatedText = `${this.personName} has a pet :D`;
      } else {
        const translatedPetName = selectedOption.label;
        this.generatedText = `${this.personName} has a ${translatedPetName.toLowerCase()} :D`;
      }

      this.hasError = false;
      this.isGeneratingText = false;
    }, 1500);
  }

  resetGeneration() {
    this.personName = '';
    this.animalType = '';
    this.hasError = false;
    this.isGeneratingText = false;
    this.generatedText = '';
  }
}