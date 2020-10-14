import { Edict } from "./Edict";

export interface Season {
  name: string;
  length: number;
  edicts: Edict[];
}

const Spring = {
  name: 'Spring',
  length: 8,
  edicts: [Edict.A, Edict.B]
}

const Summer = {
  name: 'Summer',
  length: 8,
  edicts: [Edict.B, Edict.C]
}

const Autumn = {
  name: 'Autumn',
  length: 7,
  edicts: [Edict.C, Edict.D]
}

const Winter = {
  name: 'Winter',
  length: 6,
  edicts: [Edict.D, Edict.A]
}

const Seasons = [
  Spring,
  Summer,
  Autumn,
  Winter
]

export default Seasons;