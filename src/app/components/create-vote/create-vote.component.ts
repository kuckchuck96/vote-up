import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vote } from 'src/app/models/vote';
import { VoteOption } from 'src/app/models/voteOption';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.css']
})
export class CreateVoteComponent implements OnInit {
  vote: Vote = {} as Vote;
  voteOptions: VoteOption[] = [] as Array<VoteOption>;
  voteOption: VoteOption = {} as VoteOption;

  label!: string;

  constructor(private voteService: VoteService, private router: Router) { }

  ngOnInit(): void {
  }

  createVote(): void {
    if (this.vote.title && this.voteOptions.length) {
      this.voteService.createVote({
        vote: this.vote,
        voteOptions: this.voteOptions
      }).subscribe((value) => {
        console.log(value);
        // Redirect
        this.router.navigateByUrl(`view/${value.vote.id}`);
      });      
    }
    // Create vote data
    this.clearForm();
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
  }

}
