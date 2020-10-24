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

export const TheCauldrons: ScoringCard = {
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
    mapData.applyScoringFunction((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Empty) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        const adjacentSquaresFilled = Object.values(adjacentSquares).every(square => square.terrain !== Terrain.Empty)
        if (adjacentSquaresFilled) reputation++;
      }
    })
    
    return reputation;
  }
}

export const Treetower: ScoringCard = {
  type: ScoringCardType.Forests,
  name: 'Treetower',
  text: [
    'Earn one reputation star for each forest space surrounded on all four sides by'
    + ' filled spaces or the edge of the map.'
  ],
  diagram: <div></div>,
  singlePlayerScore: 17,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.applyScoringFunction((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Forest) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        const adjacentSquaresFilled = Object.values(adjacentSquares).every(square => square.terrain !== Terrain.Empty);
        if (adjacentSquaresFilled) reputation++;
      }
    })
    
    return reputation;
  }
}

export const MagesValley: ScoringCard = {
  type: ScoringCardType.FarmAndSea,
  name: 'Mages Valley',
  text: [
    'Earn two reputation stars for each water space adjacent to a mountain space.',
    'Earn one reputation star for each farm space adjacent to a mountain space'
  ],
  diagram: <div></div>,
  singlePlayerScore: 22,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.applyScoringFunction((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Water || gridPos.terrain === Terrain.Farm) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        if (Object.values(adjacentSquares).some(square => square.terrain === Terrain.Mountain)) {
          if (gridPos.terrain === Terrain.Water) {
            reputation = reputation + 2;
          } else if (gridPos.terrain === Terrain.Farm) {
            reputation = reputation + 1;
          }
        }
      }
    })

    return reputation;
  }
}

export const SentinelWood: ScoringCard = {
  type: ScoringCardType.Forests,
  name: 'Sentinel Wood',
  text: [
    'Earn one reputation star for each forest space adjacent to the edge of the map.'
  ],
  diagram: <div></div>,
  singlePlayerScore: 25,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.applyScoringFunction((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Forest) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        const forestWorthPoint = Object.values(adjacentSquares).some(square => square.terrain === Terrain.OutOfBounds);
        if (forestWorthPoint) reputation++;
      }
    })

    return reputation;
  }
}

export const Wildholds: ScoringCard = {
  type: ScoringCardType.Villages,
  name: 'Wildholds',
  text: [
    'Earn eight reputation stars for each cluster of six or more village spaces.'
  ],
  diagram: <div></div>,
  singlePlayerScore: 16,
  score: (mapData: MapData) => {
    let reputation = 0;

    const clusters = mapData.getClusters(Terrain.Village)
    clusters.map(cluster => {
      if (cluster.gridPositions.length >= 6) {
        reputation = reputation + 8;
      }
    })

    return reputation;
  }
}

export const ForestScoringCards = [
  SentinelWood,
  Treetower
];
export const VillageScoringCards = [
  Wildholds
];
export const SpacialScoringCards = [
  TheCauldrons
];
export const FarmAndSeaScoringCards = [
  MagesValley
];

