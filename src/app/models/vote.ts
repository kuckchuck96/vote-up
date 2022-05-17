import { VoteOption } from './voteOption';

export interface Vote {
  id: number;
  title: string;
  description?: string;
  createDate: string;
  active: boolean;
  passcode: string;
  options: VoteOption[];
}
