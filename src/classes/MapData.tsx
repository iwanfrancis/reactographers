import { Shape, ShapeRotation } from "../models/Card";
import { SquareType } from "../game-components/SquareType";
import { DefaultMapSize, NormalMap } from "../game-components/Maps";
import GridPosition from "../models/GridPosition";
import { Cluster } from "../models/Cluster";
import { SoloAmbushCorner } from "../models/SoloAmbushCorner";
import { SoloAmbushDirection } from "../models/SoloAmbushDirection";
import { spiralTraverse } from "../utils/spiral-traverse";

export default class MapData {
  grid: SquareType[][];
  ruins: GridPosition[] = [];
  surroundedMountains: GridPosition[] = [];
  rows: number;
  cols: number;

  constructor(grid?: SquareType[][], ruins?: GridPosition[]) {
    if (grid) {
      this.grid = grid;
    } else {
      this.grid = new Array(DefaultMapSize.rows)
        .fill(SquareType.Empty)
        .map(() => new Array(DefaultMapSize.cols).fill(SquareType.Empty));
    }

    if (ruins) {
      this.ruins = ruins;
    }

    this.rows = this.grid.length;
    this.cols = this.grid[0].length;
  }

  public get(gridPos: GridPosition) {
    return this.grid[gridPos.row][gridPos.col];
  }

  // Check if the grid has a ruin at a given position
  public hasRuinAtPosition(gridPos: GridPosition): boolean {
    return this.ruins.some((ruinPos) => {
      return ruinPos.row === gridPos.row && ruinPos.col === gridPos.col;
    });
  }

  // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
  public addShape(terrain: SquareType, shape: ShapeRotation, gridPos: GridPosition): MapData {
    for (let shRow = 0; shRow < 4; shRow++) {
      for (let shCol = 0; shCol < 4; shCol++) {
        if (shape[shRow][shCol]) {
          const rowOffset = gridPos.row + shRow - 1;
          const colOffset = gridPos.col + shCol - 1;
          if (this.coordWithinBounds({ row: rowOffset, col: colOffset })) {
            this.grid[rowOffset][colOffset] = terrain;
          }
        }
      }
    }
    return this;
  }

  // Maps a single grid position and terrain to the grid.
  public addGridPosition(terrain: SquareType, gridPos: GridPosition): MapData {
    if (this.coordWithinBounds({ row: gridPos.row, col: gridPos.col })) {
      this.grid[gridPos.row][gridPos.col] = terrain;
    }
    return this;
  }

  // Maps a list of grid positions and terrain to the grid.
  public addGridPositions(terrain: SquareType, gridPositions: GridPosition[]): MapData {
    gridPositions.forEach((gridPos) => {
      this.addGridPosition(terrain, gridPos);
    });
    return this;
  }

  public async addMonster(
    shape: ShapeRotation,
    startingCorner: SoloAmbushCorner,
    direction: SoloAmbushDirection,
    setOverlay: React.Dispatch<React.SetStateAction<MapData>>,
    ruinActive: boolean
  ) {
    let monsterPlaced = false;
    await spiralTraverse(
      this.grid,
      startingCorner,
      direction,
      async (gridPos: GridPosition): Promise<boolean> => {
        if (this.moveIsLegal(shape, gridPos, ruinActive, true)) {
          this.addShape(SquareType.Monster, shape, gridPos);
          monsterPlaced = true;
          setOverlay(new Overlay());
        } else {
          setOverlay(new Overlay().addShape(SquareType.Monster, shape, gridPos));
          await new Promise((r) => setTimeout(r, 20));
        }

        return Promise.resolve(monsterPlaced);
      }
    );
  }

  // Given a shape and a grid position, check it can be legally placed
  public moveIsLegal(
    shape: ShapeRotation,
    gridPos: GridPosition,
    ruinActive?: boolean,
    ambushActive?: boolean
  ): boolean {
    let placedOnRuin = false;

    for (let shRow = 0; shRow < 4; shRow++) {
      for (let shCol = 0; shCol < 4; shCol++) {
        const rowOffset = gridPos.row + shRow - 1;
        const colOffset = gridPos.col + shCol - 1;
        if (shape[shRow][shCol]) {
          if (this.hasRuinAtPosition({ row: rowOffset, col: colOffset })) {
            placedOnRuin = true;
          }

          if (
            !this.coordWithinBounds({ row: rowOffset, col: colOffset }) ||
            this.grid[rowOffset][colOffset] !== SquareType.Empty
          ) {
            return false;
          }
        }
      }
    }

    if (ruinActive && !placedOnRuin && !ambushActive) {
      return false;
    }

    return true;
  }

  // Given a shape, check that its possible to place. Pass a ruins argument to only check ruins spaces
  public shapeIsPossible(shape: Shape, ruinActive?: boolean): boolean {
    return shape.some((shapeRotation) => {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.moveIsLegal(shapeRotation, { row: row, col: col }, ruinActive)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  // Given a grid position, return the terrain types of all adjacent squares.
  public getAdjacentSquares(gridPos: GridPosition): GridPosition[] {
    const row = gridPos.row;
    const col = gridPos.col;

    const upGridPos: GridPosition = { row: row - 1, col: col };
    const downGridPos: GridPosition = { row: row + 1, col: col };
    const leftGridPos: GridPosition = { row: row, col: col - 1 };
    const rightGridPos: GridPosition = { row: row, col: col + 1 };

    upGridPos.terrain = this.coordWithinBounds(upGridPos)
      ? this.get(upGridPos)
      : SquareType.OutOfBounds;
    downGridPos.terrain = this.coordWithinBounds(downGridPos)
      ? this.get(downGridPos)
      : SquareType.OutOfBounds;
    leftGridPos.terrain = this.coordWithinBounds(leftGridPos)
      ? this.get(leftGridPos)
      : SquareType.OutOfBounds;
    rightGridPos.terrain = this.coordWithinBounds(rightGridPos)
      ? this.get(rightGridPos)
      : SquareType.OutOfBounds;

    return [upGridPos, downGridPos, leftGridPos, rightGridPos];
  }

  // Given a terrain type, return an array of all clusters of that type on the grid
  public getClusters(terrain: SquareType): Cluster[] {
    let clusters: Cluster[] = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === terrain) {
          const gridPos = { row: row, col: col, terrain: terrain };
          const alreadyInCluster = clusters.some((cluster) => {
            return cluster.gridPositions.some((clGridPos) => {
              return clGridPos.row === gridPos.row && clGridPos.col === gridPos.col;
            });
          });

          const findClusterSquares = (cluster: Cluster, gridPos: GridPosition) => {
            if (gridPos.terrain === cluster.terrain) {
              const alreadyInCluster = cluster.gridPositions.some((clGridPos) => {
                return clGridPos.row === gridPos.row && clGridPos.col === gridPos.col;
              });

              if (!alreadyInCluster) {
                cluster.gridPositions.push(gridPos);
                const adjacentSquares = this.getAdjacentSquares(gridPos);
                adjacentSquares.map((square) => findClusterSquares(cluster, square));
              }
            }
          };

          if (!alreadyInCluster) {
            let cluster = {
              terrain: terrain,
              gridPositions: [],
            };
            findClusterSquares(cluster, gridPos);
            clusters.push(cluster);
          }
        }
      }
    }

    return clusters;
  }

  // Check if are any newly surrounded mountains, and then add them to the surrounded
  // mountains list
  public checkForNewSurroundedMountains(): number {
    let newSurroundedMountains: GridPosition[] = [];

    this.scoreSquares((gridPos) => {
      if (gridPos.terrain === SquareType.Mountain) {
        if (
          this.surroundedMountains.every(
            (mountain) => !(mountain.row === gridPos.row && mountain.col === gridPos.col)
          )
        ) {
          const adjacentSquares = this.getAdjacentSquares(gridPos);
          if (
            Object.values(adjacentSquares).every((square) => square.terrain !== SquareType.Empty)
          ) {
            newSurroundedMountains.push(gridPos);
          }
        }
      }
    });

    this.surroundedMountains.push(...newSurroundedMountains);

    return newSurroundedMountains.length;
  }

  // Given a scoring function, apply it to each square on the grid
  public scoreSquares(scoringFunction: (gridPos: GridPosition) => void): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const terrain = this.grid[row][col];
        scoringFunction({ row: row, col: col, terrain: terrain });
      }
    }
  }

  // Given a scoring function, apply it to each row in the grid
  public scoreRows(scoringFunction: (row: SquareType[]) => void): void {
    this.grid.forEach((row) => {
      scoringFunction(row);
    });
  }

  // Given a scoring function, apply it to each col in the grid
  public scoreCols(scoringFunction: (col: SquareType[]) => void): void {
    for (let colNum = 0; colNum < this.cols; colNum++) {
      const col = this.grid.map((row) => row[colNum]);
      scoringFunction(col);
    }
  }

  // Given a scoring function, apply it to each row and col in the grid
  public scoreRowsAndCols(scoringFunction: (rowOrCol: SquareType[]) => void): void {
    this.scoreRows(scoringFunction);
    this.scoreCols(scoringFunction);
  }

  // Given a grid position, check whether it is within the bounds of the grid
  private coordWithinBounds(gridPos: GridPosition): boolean {
    if (
      gridPos.row < 0 ||
      gridPos.row >= this.grid.length ||
      gridPos.col < 0 ||
      gridPos.col >= this.grid[0].length
    ) {
      return false;
    }
    return true;
  }
}

export class Overlay extends MapData {
  constructor(grid?: SquareType[][]) {
    if (grid) super(grid);
    else
      super(
        new Array(NormalMap.rows)
          .fill(SquareType.Empty)
          .map(() => new Array(NormalMap.cols).fill(SquareType.Empty))
      );
  }
}
