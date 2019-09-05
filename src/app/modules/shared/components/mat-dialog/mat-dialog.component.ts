import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  form: FormGroup;
  description: string;


  constructor(
    private formBuilder: FormBuilder, @Inject (MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MatDialogComponent>) {
      this.form = data.group;
    }

  ngOnInit() {
         this.form = this.formBuilder.group({
            description: ['', this.description, []],
        });
  }
  save() {
    this.dialogRef.close(this.form);
  }

  close() {
    this.dialogRef.close();
  }
  formGroupParsing(form: FormGroup) {
    let array = [form];
  }
}
