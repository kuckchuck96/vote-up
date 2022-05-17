import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'vote-up';

  ngOnInit(): void {    
    if (environment.production) {
      window.location.href = window.location.href.replace('http', 'https');
    }
  }
}
