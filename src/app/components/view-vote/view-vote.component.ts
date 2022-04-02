import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Vote } from 'src/app/models/vote';
import { VoteData } from 'src/app/models/voteData';
import { VoteOption } from 'src/app/models/voteOption';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-view-vote',
  templateUrl: './view-vote.component.html',
  styleUrls: ['./view-vote.component.css']
})
export class ViewVoteComponent implements OnInit {
  voteData: VoteData = {} as VoteData;
  voteId: string | undefined;
  winnerOption: string | undefined;
  total: number = 0;

  constructor(private route: ActivatedRoute, private voteService: VoteService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.voteId = String(this.route.snapshot.paramMap.get('id'));

    this.voteService.getVoteData(this.voteId).subscribe((value) => {
      this.voteData = value;
      this.calculateTotalVotes();
    });
  }

  updateOption(voteOption: VoteOption, e: Event): void {
    this.voteService.updateOption(String(voteOption.id)).subscribe((value) => {
      this.voteData.voteOptions.map(op => {
        if (op.id === value.id) {
          op.count = value.count;
          this.renderer.addClass(e.target, 'active');
        }
      });

      // Calculate total votes.
      this.calculateTotalVotes();
    });
  }

  onClose(e: Event): void {
    if ((e.target as HTMLInputElement).checked) {
      this.voteService.closeVote(String(this.voteId)).subscribe((value) => {
        this.voteData.vote = value;
        // Calculate total votes.
        this.calculateTotalVotes();
      });

      const btns = document.querySelectorAll('.list-group-item');
      
      // Iterate and check for class to remove it.
      btns.forEach(el => {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
        }
      });
    }
  }

  calculateTotalVotes(): void {
    this.total = 0;
    this.voteData.voteOptions.map(op => this.total += op.count);
  }

  calculatePercentageVotes(count: number, total: number): string {
    return `${Math.ceil((count / total) * 100)}%`;
  }

}
