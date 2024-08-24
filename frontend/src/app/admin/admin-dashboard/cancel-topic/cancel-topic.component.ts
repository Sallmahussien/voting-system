import { Component, ViewChild } from '@angular/core';
import { GetTopicsService } from 'src/app/services/get.topics.service';
import { GeneralTopicsComponent } from 'src/app/shared/general-topics/general-topics.component';

@Component({
  selector: 'app-cancel-topic',
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
export class CancelTopicComponent {
  url: string = 'http://localhost:8000/api/v1/topics/cancel';
  sectionTitle: string = 'Topics for Cancellation';
  buttonLabel: string = "Cancel";
  display: boolean = true;
  selectedTopic: any;
  
  constructor(
    private getTopicsService: GetTopicsService
  ) {}

  onTopicSelected(topic: any): void {
    this.selectedTopic = topic;
  }

  getSubmitAction(): () => void {
    return () => {
      if (this.selectedTopic) {
        const submitUrl = `http://localhost:8000/api/v1/topics/${this.selectedTopic.id}/cancel`;

        this.getTopicsService.submitAction(submitUrl, {}).subscribe(
          response => {
            window.location.reload();
          },
          error => {
            console.error('Cancellation failed', error);
          }
        );
      }
    };
  }
}
