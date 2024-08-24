import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostponeFormComponent } from '../postpone-form/postpone-form.component';

@Component({
  selector: 'app-postpone',
  template: `
    <app-general-topics
      [url]="url"
      [sectionTitle]="sectionTitle"
      [buttonLabel]="buttonLabel"
      [onSubmitAction]="getSubmitAction()"
      (topicSelected)="onTopicSelected($event)"
      [display]="display">
    </app-general-topics>
  `,
  styles: []
})
export class PostponeTopicComponent {
  url: string = 'http://localhost:8000/api/v1/topics/postpone';
  sectionTitle: string = "Topics for Postponement";
  buttonLabel: string = 'Postpone';
  selectedTopic: any;
  display: boolean = true;

  constructor(private dialog: MatDialog) {}

  onTopicSelected(topic: any): void {
    this.selectedTopic = topic;
  }

  openPostponeForm(): void {
    const dialogRef = this.dialog.open(PostponeFormComponent, {
      width: '400px',
      data: { topic: this.selectedTopic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  getSubmitAction(): () => void {
    return () => this.openPostponeForm();
  }
}

