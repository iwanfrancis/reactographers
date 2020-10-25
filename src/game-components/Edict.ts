import { ScoringCard } from "./ScoringCards";

export enum EdictCode {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export interface Edict {
  code: EdictCode;
  scoringCard: ScoringCard;
}