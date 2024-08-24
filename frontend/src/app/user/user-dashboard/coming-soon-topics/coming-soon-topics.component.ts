import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon-topics',
  template: `<app-general-topics
    [url]="url"
    [sectionTitle]="sectionTitle"
    [buttonLabel]="buttonLabel"
    [onSubmitAction]="getSubmitAction()"
    (topicSelected)="onTopicSelected($event)"
    [display]="display"
    >
  </app-general-topics>`,
  styleUrls: []
})
export class ComingSoonTopicsComponent {
  url: string = "http://localhost:8000/api/v1/topics/coming-soon";
  sectionTitle: string = "Coming Soon Topics";
  buttonLabel: string = "";
  selectedTopic: any;
  display: boolean = false;

  onTopicSelected(topic: any): void {
    this.selectedTopic = topic;
  }

  getSubmitAction(): () => void {
    return () => {
      if (this.selectedTopic) {
      }
    };
  }

}
