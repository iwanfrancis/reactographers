import React from "react";
import MapData from "../classes/MapData";
import GridPosition from "./GridPosition";
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
    'Earn one reputation star for each empty space surrounded on all four'
    + 'sides by filled spaces or the edge of the map'
  ],
  diagram: <div></div>,
  singlePlayerScore: 20,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.applyScoringFunction((gridPos: GridPosition, terrain: Terrain) => {
      if (terrain === Terrain.Empty) {
        const adjacent = mapData.getAdjacentSquares(gridPos);
        const adjacentSquaresFilled = Object.values(adjacent).every(square => square !== Terrain.Empty)
        if (adjacentSquaresFilled) reputation++;
      }
    })
    console.log('The Cauldrons', reputation);
    return reputation;
  }
}

const MagesValley: ScoringCard = {
  type: ScoringCardType.Spacial,
  name: 'Mages Valley',
  text: [
    'Earn two reputation stars for each water space adjacent to a mountain space.',
    'Earn one reputation star for each farm space adjacent to a mountain space'
  ],
  diagram: <div></div>,
  singlePlayerScore: 22,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.applyScoringFunction((gridPos: GridPosition, terrain: Terrain) => {
      if (terrain === Terrain.Mountain) {
        const adjacent = mapData.getAdjacentSquares(gridPos);
        const pointsForMountain = Object.values(adjacent).reduce((points: number, terrain: Terrain) => {
          if (terrain === Terrain.Water) return points + 2;
          else if (terrain === Terrain.Farm) return points + 1;
          else return points;
        }, 0);

        reputation = reputation + pointsForMountain;
      }
    })
    console.log('Mages Valley: ', reputation);
    return reputation;
  }
}



export const ForestScoringCards = [];
export const VillageScoringCards = [];
export const SpacialScoringCards = [
  TheCauldrons
];
export const FarmAndSeaScoringCards = [
  MagesValley
];

