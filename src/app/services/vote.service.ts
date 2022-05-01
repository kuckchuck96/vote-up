import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vote } from '../models/vote';
import { VoteData } from '../models/voteData';
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
    if (!environment.production) {
      this.baseUrl = environment.apiBaseUrl;
    }
  }

  createVote(voteData: VoteData): Observable<VoteData> {
    return this.http.post<VoteData>(
      `${this.baseUrl}/create`,
      voteData,
      httpOptions
    );
  }

  getVoteData(id: string): Observable<VoteData> {
    return this.http.get<VoteData>(`${this.baseUrl}/${id}`, httpOptions);
  }

  closeVote(id: string, passcode: string): Observable<Vote> {
    return this.http.post<Vote>(`${this.baseUrl}/close/${id}?passcode=${passcode}`, httpOptions);
  }

  updateOption(id: string): Observable<VoteOption> {
    return this.http.post<VoteOption>(
      `${this.baseUrl}/update/${id}`,
      httpOptions
    );
  }

  validatePasscode(id: string, passcode: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/validate/${id}?passcode=${passcode}`,
      httpOptions
    );
  }
}
