import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vote } from '../models/vote';
import { VoteOption } from '../models/voteOption';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
  }

  createVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${this.baseUrl}/create`, vote, httpOptions);
  }

  getVoteData(id: Number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/${id}`, httpOptions);
  }

  closeVote(id: number, passcode: string): Observable<Vote> {
    return this.http.post<Vote>(
      `${this.baseUrl}/close/${id}?passcode=${passcode}`,
      httpOptions
    );
  }

  updateOption(id: Number): Observable<VoteOption> {
    return this.http.put<VoteOption>(
      `${this.baseUrl}/update/${id}`,
      httpOptions
    );
  }
}
