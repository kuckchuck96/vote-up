import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  brand: string = 'VoteUp!';
  env?: boolean;

  constructor() { }

  ngOnInit(): void {
    this.env = environment.production;
  }

  redirectToGitHub(): void {
    window.location.href = 'https://github.com/kuckchuck96/vote-up';
  }

}
