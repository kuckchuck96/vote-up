import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vote } from 'src/app/models/vote';
import { VoteOption } from 'src/app/models/voteOption';
import { MessageService } from 'src/app/services/message.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.css'],
})
export class CreateVoteComponent implements OnInit {
  vote: Vote = {} as Vote;
  voteOptions: VoteOption[] = [] as Array<VoteOption>;
  voteOption: VoteOption = {} as VoteOption;

  label!: string;

  constructor(
    private voteService: VoteService,
    private router: Router,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {}

  createVote(): void {
    if (this.validateFields()) {
      this.voteService
        .createVote({
          vote: this.vote,
          voteOptions: this.voteOptions,
        })
        .subscribe((value) => {
          // Clear from data
          this.clearForm();
          // Redirect
          this.router.navigateByUrl(`view/${value.vote.id}`);
        });
    }
  }

  addOption(): void {
    if (this.voteOption.label && this.voteOptions.length < 5) {
      this.voteOption.count = 0;
      this.voteOptions.push(this.voteOption);

      this.voteOption = {} as VoteOption;
    }
  }

  clearForm(): void {
    this.vote = {} as Vote;
    this.voteOption = {} as VoteOption;
    this.voteOptions = [] as Array<VoteOption>;
    // Clear error messages
    this.msgService.clear();
  }

  validateFields(): boolean {
    let isOk = true;
    const re = /\d{6}/;

    if (!this.vote.title) {
      this.msgService.add('Title of the vote is missing.');
      isOk &&= false;
    }

    if (this.voteOptions.length < 2) {
      this.msgService.add('Vote requires options to choose from.');
      isOk &&= false;
    }

    if (!this.vote.passcode || !re.exec(this.vote.passcode)) {
      this.msgService.add('Enter a valid passcode.');
      isOk &&= false;
    }    

    return isOk;
  }
}
