import { Vote } from "./vote";
import { VoteOption } from "./voteOption";

export interface VoteData {
    vote: Vote;
    voteOptions: VoteOption[];
}