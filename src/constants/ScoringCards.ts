import MapData from "../classes/MapData";

export enum ScoringCardType {
  Forests = 'Forests',
  Villages = 'Villages',
  Spacial = 'Spacial',
  FarmAndSea = 'Farm and Sea'
}

export interface ScoringCards {
  type: ScoringCardType;
  name: string;
  text: string;
  diagram: JSX.Element;
  singlePlayerScore: number;
  score: (mapData: MapData) => number;
}