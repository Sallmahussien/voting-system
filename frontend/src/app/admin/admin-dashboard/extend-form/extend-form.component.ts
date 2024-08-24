import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { GetTopicsService } from '../../../services/get.topics.service'; 


@Component({
  selector: 'app-extend-form',
  templateUrl: './extend-form.component.html',
  styleUrls: ['./extend-form.component.css']
})
export class ExtendFormComponent {
  extendForm: FormGroup;
  topicEndDate: Date;
  topicId: number;

  constructor(
    public dialogRef: MatDialogRef<ExtendFormComponent>,
    private fb: FormBuilder,
    private getTopicsService: GetTopicsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.topicEndDate = data.topic.endDate;
    this.topicId = parseInt(data.topic.id);

    this.extendForm = this.fb.group({
      endDate: ['',
        [
          Validators.required,
          this.dateGreaterThanValidator(this.topicEndDate),
        ]
      ]
    });
  }

  dateGreaterThanValidator(endDate: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && new Date(control.value) <= new Date(endDate)) {
        return { 'dateBeforeEnd': true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.extendForm.valid) {
      const formData = this.extendForm.value;
      
      const submitUrl = `http://localhost:8000/api/v1/topics/${this.topicId}/extend`;

      this.getTopicsService.submitAction(submitUrl, formData).subscribe(
        response => {
          this.dialogRef.close(formData);
        },
        error => {
          console.error('Update failed', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

