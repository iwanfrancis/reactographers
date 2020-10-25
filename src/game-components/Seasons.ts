import { EdictCode } from "./Edict";

export interface Season {
  name: string;
  length: number;
  edicts: EdictCode[];
}

const Spring = {
  name: 'Spring',
  length: 8,
  edicts: [EdictCode.A, EdictCode.B]
}

const Summer = {
  name: 'Summer',
  length: 8,
  edicts: [EdictCode.B, EdictCode.C]
}

const Autumn = {
  name: 'Autumn',
  length: 7,
  edicts: [EdictCode.C, EdictCode.D]
}

const Winter = {
  name: 'Winter',
  length: 6,
  edicts: [EdictCode.D, EdictCode.A]
}

const Seasons = [
  Spring,
  Summer,
  Autumn,
  Winter
]

export default Seasons;