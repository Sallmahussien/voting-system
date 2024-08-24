import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { GetTopicsService } from '../../../services/get.topics.service'; 


@Component({
  selector: 'app-postpone-form',
  templateUrl: './postpone-form.component.html',
  styleUrls: ['./postpone-form.component.css']
})
export class PostponeFormComponent {
  postponeForm: FormGroup;
  topicStartDate: Date;
  topicId: number;

  constructor(
    public dialogRef: MatDialogRef<PostponeFormComponent>,
    private fb: FormBuilder,
    private getTopicsService: GetTopicsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.topicStartDate = data.topic.startDate;
    this.topicId = parseInt(data.topic.id);

    this.postponeForm = this.fb.group({
      startDate: ['',
        [
          Validators.required,
          this.dateGreaterThanValidator(this.topicStartDate),
        ]
      ]
    });
  }

  dateGreaterThanValidator(startDate: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && new Date(control.value) <= new Date(startDate)) {
        return { 'dateBeforeStart': true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.postponeForm.valid) {
      const formData = this.postponeForm.value;
      
      const submitUrl = `http://localhost:8000/api/v1/topics/${this.topicId}/postpone`;

      this.getTopicsService.submitAction(submitUrl, formData).subscribe(
        response => {
          console.log('Update successful', response);
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
