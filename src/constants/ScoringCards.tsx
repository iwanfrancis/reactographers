import React from "react";
import MapData from "../classes/MapData";
import GridPosition from "../models/GridPosition";
import { Terrain } from "./Terrains";

export enum ScoringCardType {
  Forests = 'Forests',
  Villages = 'Villages',
  Spacial = 'Spacial',
  FarmAndSea = 'Farm and Sea'
}

export interface ScoringCard {
  type: ScoringCardType;
  name: string;
  text: string[];
  diagram: JSX.Element;
  singlePlayerScore: number;
  score: (mapData: MapData) => number;
}

const TheCauldrons: ScoringCard = {
  type: ScoringCardType.Spacial,
  name: 'The Cauldrons',
  text: [
    'Earn one reputation star for each empty space surrounded on all four\
     sides by filled spaces or the edge of the map'
  ],
  diagram: <div></div>,
  singlePlayerScore: 20,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.applyScoringFunction((gridPos: GridPosition, terrain: Terrain) => {
      const adjacent = mapData.getAdjacentSquares(gridPos);
      const adjacentSquaresFilled = Object.values(adjacent).every(square => square !== Terrain.Empty)
      if (adjacentSquaresFilled && terrain === Terrain.Empty) reputation++;
    })
    console.log(reputation);
    return reputation;
  }
}

export const ForestScoringCards = [];
export const VillageScoringCards = [];
export const SpacialScoringCards = [
  TheCauldrons
];
export const FarmAndSeaScoringCards = [];

