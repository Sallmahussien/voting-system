import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExtendFormComponent } from '../extend-form/extend-form.component';

@Component({
  selector: 'app-extend-topic',
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
export class ExtendTopicComponent {
  url: string = 'http://localhost:8000/api/v1/topics/extend';
  sectionTitle: string = "Topics for Extension";
  buttonLabel: string = "Extend";
  selectedTopic: any;
  display: boolean = true;

  constructor(private dialog: MatDialog) {}

  onTopicSelected(topic: any): void {
    this.selectedTopic = topic;
  }

  openExtendForm(): void {
    const dialogRef = this.dialog.open(ExtendFormComponent, {
      width: '500px',
      data: { topic: this.selectedTopic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  getSubmitAction(): () => void {
    return () => this.openExtendForm();
  }
}
