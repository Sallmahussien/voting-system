import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote-option',
  templateUrl: './vote-option.component.html',
  styleUrls: []
})
export class VoteOptionComponent {
  selectedOption: any = null;

  constructor(
    public dialogRef: MatDialogRef<VoteOptionComponent>,
    private voteService: VoteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.selectedOption) {
      const url: string = `http://localhost:8000/api/v1/options/${this.selectedOption.id}/vote`;
      
      this.voteService.createVote(url).subscribe(
        response => {
          this.dialogRef.close(this.selectedOption);
        },
        error => {
          console.error('Update failed', error);
        }
      );
    }
  }

}
