import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
