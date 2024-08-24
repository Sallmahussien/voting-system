import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VoteOptionComponent } from './vote-option/vote-option.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-topics',
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
export class CurrentTopicsComponent {
  url: string = "http://localhost:8000/api/v1/topics/active";
  sectionTitle: string = "All Topics";
  buttonLabel: string = "Vote";
  selectedTopic: any;
  display: boolean = true;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  onTopicSelected(topic: any): void {
    this.selectedTopic = topic;
  }

  openOptionVoteForm() {
    const dialogRef = this.dialog.open(VoteOptionComponent, {
      width: '500px',
      data: { topic: this.selectedTopic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([this.router.url]);
        window.location.reload();
      }
    });
  }

  getSubmitAction(): () => void {
    return () => this.openOptionVoteForm();
  }
}
