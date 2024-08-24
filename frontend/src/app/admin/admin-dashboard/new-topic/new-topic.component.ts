import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {
  newTopicForm: FormGroup;

  constructor(private fb: FormBuilder, private topicService: TopicService) { }

  ngOnInit(): void {
    this.newTopicForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      options: this.fb.array([], [Validators.minLength(2), Validators.maxLength(5)]),
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  get options() {
    return this.newTopicForm.get('options') as FormArray;
  }

  addOption() {
    if (this.options.length < 5) {
      this.options.push(this.fb.control('', Validators.required));
    }
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  onSubmit() {
    this.newTopicForm.markAllAsTouched();

    if (this.newTopicForm.valid) {
      const topicData = this.newTopicForm.value;
      this.topicService.createTopic(topicData).subscribe(
        response => {
          this.newTopicForm.reset();
        },
        error => {
          console.error('Error creating topic:', error);
        }
      );
    }
  }

  isFieldInvalid(field: string) {
    const control = this.newTopicForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
