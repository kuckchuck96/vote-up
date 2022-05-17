import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vote } from 'src/app/models/vote';
import { VoteOption } from 'src/app/models/voteOption';
import { MessageService } from 'src/app/services/message.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-view-vote',
  templateUrl: './view-vote.component.html',
  styleUrls: ['./view-vote.component.css'],
})
export class ViewVoteComponent implements OnInit {
  vote!: Vote;
  voteId!: number;
  winnerOption: string | undefined;
  total: number = 0;
  disableOptions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private voteService: VoteService,
    private renderer: Renderer2,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.voteId = Number(this.route.snapshot.paramMap.get('id'));

    this.voteService.getVoteData(this.voteId).subscribe({
      next: (v) => (this.vote = v),
      error: (e) => this.msgService.add(e.message),
      complete: () => this.calculateTotalVotes(),
    });
  }

  updateOption(option: VoteOption, e: Event): void {
    this.voteService.updateOption(option.id).subscribe({
      next: (v) => {
        this.vote?.options.map((op) => {
          if (op.id === v.id) {
            op.count = v.count;
            this.renderer.addClass(e.target, 'active');
            this.disableOptions = true;
          }
        });
      },
      error: (e) => this.msgService.add(e.message),
      complete: () => this.calculateTotalVotes(),
    });
  }

  onClose(passcode: string): void {
    const checkbox = document.querySelector('#flexSwitchCheckChecked:checked');
    const passcodeCloseModal = document.querySelector('#closeModal');

    // Clear existing errors
    this.msgService.clear();

    if (passcode) {
      if ((checkbox as HTMLInputElement).checked) {
        this.voteService.closeVote(this.vote.id, passcode).subscribe({
          next: (v) => {
            this.vote = v;
            // Calculate total votes
            this.calculateTotalVotes();
            // Clear errors
            this.msgService.clear();
          },
          error: (e) => {
            this.msgService.add(e.message);
            this.renderer.setProperty(checkbox, 'checked', false);
            (passcodeCloseModal as HTMLElement).click();
          },
          complete: () => {
            (passcodeCloseModal as HTMLElement).click();
          },
        });

        const btns = document.querySelectorAll('.list-group-item');
        // Iterate and check for class to remove it.
        btns.forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          }
        });
      }
    } else {
      (checkbox as HTMLInputElement).checked = false;
    }
  }

  calculateTotalVotes(): void {
    this.total = 0;
    this.vote?.options.map((op) => (this.total += op.count));
  }

  calculatePercentageVotes(count: number, total: number): string {
    return `${Math.ceil((count / total) * 100)}%`;
  }

  getPasscode(value: string): void {
    this.onClose(value);
  }

  copyUrl(): void {
    navigator.clipboard
      .writeText(window.location.href)
      .then((value) => alert('Link copied to the clipboard!'))
      .catch((err) => console.error(err.message));
  }
}
