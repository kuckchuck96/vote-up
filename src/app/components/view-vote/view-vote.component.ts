import {
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoteData } from 'src/app/models/voteData';
import { VoteOption } from 'src/app/models/voteOption';
import { MessageService } from 'src/app/services/message.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-view-vote',
  templateUrl: './view-vote.component.html',
  styleUrls: ['./view-vote.component.css'],
})
export class ViewVoteComponent implements OnInit {
  voteData: VoteData = {} as VoteData;
  voteId?: string;
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
    this.voteId = String(this.route.snapshot.paramMap.get('id'));

    this.voteService.getVoteData(this.voteId).subscribe((value) => {
      this.voteData = value;
      this.calculateTotalVotes();
    });
  }

  updateOption(voteOption: VoteOption, e: Event): void {
    this.voteService.updateOption(String(voteOption.id)).subscribe((value) => {
      this.voteData.voteOptions.map((op) => {
        if (op.id === value.id) {
          op.count = value.count;
          this.renderer.addClass(e.target, 'active');
          this.disableOptions = true;
        }
      });

      // Calculate total votes.
      this.calculateTotalVotes();
    });
  }

  onClose(passcode: string): void {
    const checkbox = document.querySelector('#flexSwitchCheckChecked:checked');
    const passcodeCloseModal = document.querySelector('#closeModal');

    // Clear existing errors
    this.msgService.clear();

    if (passcode) {
      if ((checkbox as HTMLInputElement).checked) {
        this.voteService.closeVote(String(this.voteId), passcode).subscribe({
          next: (v) => {
            this.voteData.vote = v;
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
    this.voteData.voteOptions.map((op) => (this.total += op.count));
  }

  calculatePercentageVotes(count: number, total: number): string {
    return `${Math.ceil((count / total) * 100)}%`;
  }

  getPasscode(value: string): void {
    this.onClose(value);
  }
}
