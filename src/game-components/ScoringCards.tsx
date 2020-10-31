import React from "react";
import MapData from "../classes/MapData";
import { Cluster } from "../models/Cluster";
import GridPosition from "../models/GridPosition";
import { shuffleArray } from "../utils/shuffle";
import { Edict, EdictCode } from "./Edict";
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

export const Borderlands: ScoringCard = {
  type: ScoringCardType.Spacial,
  name: 'Borderlands',
  text: [
    'Earn six reputation stars for each complete row or complete column of filled spaces'
  ],
  diagram: <div></div>,
  singlePlayerScore: 24,
  score: (mapData: MapData) => {
    let reputation = 0;
    
    mapData.scoreRowsAndCols((rowOrCol: Terrain[]) => {
      if (rowOrCol.every(terrain => terrain !== Terrain.Empty)) {
        reputation += 6;
      }
    })

    return reputation;
  }
}

export const CanalLake: ScoringCard = {
  type: ScoringCardType.FarmAndSea,
  name: 'Canal Lake',
  text: [
    'Earn one reputation star for each water space adjacent to at least one farm space.',
    'Earn one reputation star for each farm space adjacent to at least one water space.'
  ],
  diagram: <div></div>,
  singlePlayerScore: 24,
  score: (mapData: MapData) => {
    let reputation = 0;
    
    mapData.scoreSquares((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Water || gridPos.terrain === Terrain.Farm) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        const requiredAdjacentTerrain = gridPos.terrain === Terrain.Water ? Terrain.Farm : Terrain.Water;
        const requiredTerrainFound = Object.values(adjacentSquares).some(square => square.terrain === requiredAdjacentTerrain);
        if (requiredTerrainFound) reputation++;
      }
    })

    return reputation;
  }
}

export const GreatCity: ScoringCard = {
  type: ScoringCardType.Villages,
  name: 'Great City',
  text: [
    'Earn one reputation star for each village space in the largest cluster of village spaces that is not adjacent to a mountain space',
  ],
  diagram: <div></div>,
  singlePlayerScore: 16,
  score: (mapData: MapData) => {
    let reputation = 0;
    
    const sortedVillageClusters = mapData.getClusters(Terrain.Village).sort((a, b) => {
      return b.gridPositions.length - a.gridPositions.length;
    })

    let validVillageClusters: Cluster[] = [];

    sortedVillageClusters.forEach(cluster => {
      let clusterAdjacentMountain = false;

      cluster.gridPositions.forEach(gridPos => {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        if (adjacentSquares.some(square => square.terrain === Terrain.Mountain)) {
          clusterAdjacentMountain = true;
        }
      })

      if (!clusterAdjacentMountain) {
        validVillageClusters.push(cluster);
      }
    })

    if (validVillageClusters.length > 0) {
      reputation += validVillageClusters[0].gridPositions.length;
    }

    return reputation;
  }
}

export const Greenbough: ScoringCard = {
  type: ScoringCardType.Forests,
  name: 'Greenbough',
  text: [
    'Earn one reputation star for each row and column with at least one forest space. The same forest space may be scored in a row and a column.',
  ],
  diagram: <div></div>,
  singlePlayerScore: 22,
  score: (mapData: MapData) => {
    let reputation = 0;
  
    mapData.scoreRowsAndCols((rowOrCol: Terrain[]) => {
      if (rowOrCol.some(terrain => terrain === Terrain.Forest)) {
        reputation += 1;
      }
    })

    return reputation;
  }
}

export const GreengoldPlains: ScoringCard = {
  type: ScoringCardType.Villages,
  name: 'Greengold Plains',
  text: [
    'Earn three reputation stars for each cluster of village spaces that is adjacent to three or more different terrain types.',
  ],
  diagram: <div></div>,
  singlePlayerScore: 21,
  score: (mapData: MapData) => {
    let reputation = 0;

    const villageClusters = mapData.getClusters(Terrain.Village)

    villageClusters.forEach(cluster => {
      let uniqueAdjacentTerrains: Terrain[] = []
      const illegalTerrains = [Terrain.Empty, Terrain.OutOfBounds, Terrain.Village, Terrain.Wastelands];

      cluster.gridPositions.forEach(space => {
        const adjacentSquares = mapData.getAdjacentSquares(space);
        adjacentSquares.forEach(square => {
          if (square.terrain && !illegalTerrains.includes(square.terrain) && !uniqueAdjacentTerrains.includes(square.terrain)) {
            uniqueAdjacentTerrains.push(square.terrain);
          }
        })
      })

      if (uniqueAdjacentTerrains.length >= 3) {
        reputation += 3;
      }
    })

    return reputation;
  }
}

export const LostBarony: ScoringCard = {
  type: ScoringCardType.Spacial,
  name: 'Lost Barony',
  text: [
    'Earn three reputation stars for each space along one edge of the largest square of filled spaces',
  ],
  diagram: <div></div>,
  singlePlayerScore: 24,
  score: (mapData: MapData) => {
    let reputation = 0;
    let biggestSquareWidth = 0;
    const grid = mapData.grid;

    mapData.scoreSquares((gridPos: GridPosition) => {
      let currentSquareWidth = 0;
      let stillSquare = true;
      let startingRow, startingCol, currentRow, currentCol;
      startingRow = currentRow = gridPos.row;
      startingCol = currentCol = gridPos.col;

      while (stillSquare && currentRow < mapData.rows && currentCol < mapData.cols) {
        let allSpacesFilled = true;

        for (let row = startingRow; row <= currentRow; row++) {
          if (grid[row][currentCol] === Terrain.Empty) {
            allSpacesFilled = false;
          }
        }

        for (let col = startingCol; col <= currentCol; col++) {
          if (grid[currentRow][col] === Terrain.Empty) {
            allSpacesFilled = false;
          }
        }

        if (!allSpacesFilled) {
          stillSquare = false;
        } else {
          currentSquareWidth = currentCol - startingCol + 1;
          currentRow++;
          currentCol++;
        }
      }

      if (currentSquareWidth > biggestSquareWidth) {
        biggestSquareWidth = currentSquareWidth
      }
    })

    reputation = biggestSquareWidth * 3;

    return reputation;
  }
}


export const TheBrokenRoad: ScoringCard = {
  type: ScoringCardType.Spacial,
  name: 'The Broken Road',
  text: [
    'Earn three reputation starts for each complete diagonal line of filled spaces that touches the left and bottom edges of the map.'
  ],
  diagram: <div></div>,
  singlePlayerScore: 24,
  score: (mapData: MapData) => {
    let reputation = 0;
    const grid = mapData.grid;

    for (let row = 0; row < mapData.rows; row++) {
      let lineBroken = false;
      let currentRow = row;
      let currentCol = 0;
      const illegalTerrains = [Terrain.Empty, Terrain.OutOfBounds];

      while (lineBroken === false && currentRow < mapData.rows) {
        if (illegalTerrains.includes(grid[currentRow][currentCol])) {
          lineBroken = true;
          break;
        }
        currentRow++;
        currentCol++;
      }

      if (!lineBroken) {
        reputation += 3;
      }
    }
    
    return reputation;
  }
}

export const TheCauldrons: ScoringCard = {
  type: ScoringCardType.Spacial,
  name: 'The Cauldrons',
  text: [
    'Earn one reputation star for each empty space surrounded on all four'
    + ' sides by filled spaces or the edge of the map'
  ],
  diagram: <div></div>,
  singlePlayerScore: 20,
  score: (mapData: MapData) => {
    let reputation = 0;
    mapData.scoreSquares((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Empty) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        const adjacentSquaresFilled = Object.values(adjacentSquares).every(square => square.terrain !== Terrain.Empty)
        if (adjacentSquaresFilled) reputation++;
      }
    })
    
    return reputation;
  }
}

export const TheGoldenGranary: ScoringCard = {
  type: ScoringCardType.FarmAndSea,
  name: 'The Golden Granary',
  text: [
    'Earn one reputation star for each water space adjacent to a ruins space.',
    'Earn three reputation stars for each farm sapce on a ruins space'
  ],
  diagram: <div></div>,
  singlePlayerScore: 20,
  score: (mapData: MapData) => {
    let reputation = 0;
    
    mapData.scoreSquares((gridPos: GridPosition) => {

      if (gridPos.terrain === Terrain.Farm) {
        if (mapData.ruins.some(ruinPos => ruinPos.row === gridPos.row && ruinPos.col === gridPos.col)) {
          reputation += 3;
        }
      }

      if (gridPos.terrain === Terrain.Water) {
        let adjacentRuinFound = false;
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        
        adjacentSquares.forEach(square => {
          if (mapData.ruins.some(ruinPos => ruinPos.row === square.row && ruinPos.col === square.col)) {
            adjacentRuinFound = true;
          }
        })

        if (adjacentRuinFound) {
          reputation += 1;
        }
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
    mapData.scoreSquares((gridPos: GridPosition) => {
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
    mapData.scoreSquares((gridPos: GridPosition) => {
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
    mapData.scoreSquares((gridPos: GridPosition) => {
      if (gridPos.terrain === Terrain.Forest) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        const forestWorthPoint = Object.values(adjacentSquares).some(square => square.terrain === Terrain.OutOfBounds);
        if (forestWorthPoint) reputation++;
      }
    })

    return reputation;
  }
}

export const ShieldGate: ScoringCard = {
  type: ScoringCardType.Villages,
  name: 'Shieldgate',
  text: [
    'Earn two reputation stars for each village space in the second largest cluster of village spaces'
  ],
  diagram: <div></div>,
  singlePlayerScore: 20,
  score: (mapData: MapData) => {
    let reputation = 0;
    const clusters = mapData.getClusters(Terrain.Village)
    if (clusters.length > 1) {
      const sortedClusters = clusters.sort((a, b) => {
        return b.gridPositions.length - a.gridPositions.length;
      })

      reputation += sortedClusters[1].gridPositions.length * 2;
    }

    return reputation;
  }
}

export const ShoresideExpanse: ScoringCard = {
  type: ScoringCardType.FarmAndSea,
  name: 'Shoreside Expanse',
  text: [
    'Earn three reputation stars for each cluster of farm spaces not adjacent to a water space or the edge of the map.',
    'Earn three reputation stars for each cluster of water spaces not adjacent to a farm space or the edge of the map.'
  ],
  diagram: <div></div>,
  singlePlayerScore: 27,
  score: (mapData: MapData) => {
    let reputation = 0;
    
    const farmClusters = mapData.getClusters(Terrain.Farm)
    const waterClusters = mapData.getClusters(Terrain.Water)
    const allClusters = [...farmClusters, ...waterClusters];

    allClusters.forEach(cluster => {
      const oppositeTerrain = cluster.terrain === Terrain.Farm ? Terrain.Water : Terrain.Farm
      let clusterWorthPoints = true;

      cluster.gridPositions.forEach(gridPos => {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        if (adjacentSquares.some(square => square.terrain === oppositeTerrain || square.terrain === Terrain.OutOfBounds)) {
          clusterWorthPoints = false;
        }
      })

      if (clusterWorthPoints) {
        reputation += 3;
      }
    })

    return reputation;
  }
}

export const StonesideForest: ScoringCard = {
  type: ScoringCardType.Forests,
  name: 'Stoneside Forest',
  text: [
    'Earn three reputation stars for each mountain space connected to another mountain space by a cluster of forest spaces'
  ],
  diagram: <div></div>,
  singlePlayerScore: 18,
  score: (mapData: MapData) => {
    let reputation = 0;
    
    mapData.scoreSquares((startingGridPos: GridPosition) => {
      if (startingGridPos.terrain === Terrain.Mountain) {
        let connectedMountainFound = false;
        let connectedForestSpaces: GridPosition[] = [];

        const findLinkToMountain = (connectedForestSpaces: GridPosition[] , gridPos: GridPosition ) => {
          if (gridPos.row === startingGridPos.row && gridPos.col === startingGridPos.col) {
            const adjacentSquares = mapData.getAdjacentSquares(gridPos);
            adjacentSquares.forEach(square => findLinkToMountain(connectedForestSpaces, square))
          }
          if (!connectedMountainFound) {
            if (
              gridPos.terrain === Terrain.Mountain && 
              gridPos.row !== startingGridPos.row && 
              gridPos.col !== startingGridPos.col) {
                connectedMountainFound = true;
            } else if (gridPos.terrain === Terrain.Forest) {
              const alreadyFound = connectedForestSpaces.some(forestGridPos => {
                return (forestGridPos.row === gridPos.row && forestGridPos.col === gridPos.col);
              })
  
              if (!alreadyFound) {
                connectedForestSpaces.push(gridPos);
                const adjacentSquares = mapData.getAdjacentSquares(gridPos);
                adjacentSquares.forEach(square => findLinkToMountain(connectedForestSpaces, square))
              }
            }
          }
        }

        findLinkToMountain(connectedForestSpaces, startingGridPos)

        if (connectedMountainFound) {
          reputation += 3;
        }
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
    clusters.forEach(cluster => {
      if (cluster.gridPositions.length >= 6) {
        reputation = reputation + 8;
      }
    })

    return reputation;
  }
}

export const ForestScoringCards = [
  Greenbough,
  SentinelWood,
  StonesideForest,
  Treetower
];
export const VillageScoringCards = [
  GreatCity,
  GreengoldPlains,
  ShieldGate,
  Wildholds
];
export const SpacialScoringCards = [
  Borderlands,
  LostBarony,
  TheBrokenRoad,
  TheCauldrons
];
export const FarmAndSeaScoringCards = [
  CanalLake,
  MagesValley,
  ShoresideExpanse,
  TheGoldenGranary
];

export const drawEdicts = (): Edict[] => {
  const scoringCards = []
  scoringCards.push(shuffleArray(ForestScoringCards).pop())
  scoringCards.push(shuffleArray(VillageScoringCards).pop())
  scoringCards.push(shuffleArray(SpacialScoringCards).pop())
  scoringCards.push(shuffleArray(FarmAndSeaScoringCards).pop())
  
  const shuffledScoringCards = shuffleArray(scoringCards);

  return ([
    {code: EdictCode.A, scoringCard: shuffledScoringCards[0]},
    {code: EdictCode.B, scoringCard: shuffledScoringCards[1]},
    {code: EdictCode.C, scoringCard: shuffledScoringCards[2]},
    {code: EdictCode.D, scoringCard: shuffledScoringCards[3]},
  ]);
}

