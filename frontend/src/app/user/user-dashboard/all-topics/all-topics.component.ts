import { Component } from '@angular/core';

@Component({
  selector: 'app-all-topics',
  template: `
    <app-general-topics
      [url]="url"
      [sectionTitle]="sectionTitle"
      [buttonLabel]="buttonLabel"
      [onSubmitAction]="getSubmitAction()"
      (topicSelected)="onTopicSelected($event)"
      [display]="display"
      >
    </app-general-topics>
  `,
  styleUrls: []
})
export class AllTopicsComponent {
  url: string = "http://localhost:8000/api/v1/topics/sorted";
  sectionTitle: string = "All Topics";
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
