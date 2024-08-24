import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetTopicsService } from 'src/app/services/get.topics.service';

@Component({
  selector: 'app-general-topics',
  templateUrl: './general-topics.component.html',
  styleUrls: ['./general-topics.component.css']
})
export class GeneralTopicsComponent implements OnInit {
  @Input() url: string = '';
  @Input() sectionTitle: string = '';
  @Input() buttonLabel!: string;
  @Input() onSubmitAction!: () => void;
  @Input() display!: boolean;

  @Output() topicSelected = new EventEmitter<any>();

  topics: any[] = [];
  selectedTopic: any;

  constructor(private getTopicsService: GetTopicsService) { }

  ngOnInit(): void {
    this.getTopicsService.getTopics(this.url).subscribe((data) => {
      this.topics = data;
      if (this.topics.length > 0) {
        this.selectedTopic = this.topics[0];
        this.topicSelected.emit(this.selectedTopic);
      }
    });
  }

  selectTopic(topic: any): void {
    this.selectedTopic = null;

    const urlParts = this.url.split('/');
    urlParts.pop();
    const baseUrl = urlParts.join('/');
    const submitUrl = `${baseUrl}/${topic.id}/options`;

    this.getTopicsService.getTopicOptions(submitUrl).subscribe((options) => {
      topic.options = options;
      this.selectedTopic = topic;
      this.topicSelected.emit(this.selectedTopic);
    });
  }

  onSubmit(): void {
    if (this.onSubmitAction) {
      this.onSubmitAction();
    }
  }
}
