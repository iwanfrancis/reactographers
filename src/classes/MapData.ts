import { ShapeRotation } from "../models/Card";
import { Terrain } from "../models/Terrains";
import { MapSize } from "../models/Maps";
import GridPosition from "../models/GridPosition";
import { Cluster } from "../models/Cluster";

export default class MapData {
    grid: (Terrain)[][]
    rows: number;
    cols: number;
  
    constructor(grid?: (Terrain)[][]) {
      if (grid) {
        this.grid = grid
      } else {
        this.grid = new Array(MapSize.rows).fill(null).map(() => new Array(MapSize.cols).fill(null))
      }
      this.rows = this.grid.length;
      this.cols = this.grid[0].length;
    }
  
    public get(gridPos: GridPosition) {
      return this.grid[gridPos.row][gridPos.col];
    }
  
    // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
    public addShape(terrain: Terrain, shape: ShapeRotation, gridPos: GridPosition): MapData {
      for (let shRow = 0; shRow < 4; shRow++) {
        for (let shCol = 0; shCol < 4; shCol++) {
          if (shape[shRow][shCol]) {
            const rowOffset = (gridPos.row + shRow - 1);
            const colOffset = (gridPos.col + shCol - 1);
            if (this.coordWithinBounds({row: rowOffset, col: colOffset})) {
              this.grid[rowOffset][colOffset] = terrain;
            } 
          } 
        }
      }
      return this;
    }

    // Given a shape and a grid position, check it can be legally placed
    public moveIsLegal(shape: ShapeRotation, gridPos: GridPosition): boolean {
      for (let shRow = 0; shRow < 4; shRow++) {
        for (let shCol = 0; shCol < 4; shCol++) {
          const rowOffset = (gridPos.row + shRow - 1);
          const colOffset = (gridPos.col + shCol - 1);
          if (shape[shRow][shCol])  {
            if ( !this.coordWithinBounds({row: rowOffset, col: colOffset})
              || this.grid[rowOffset][colOffset] !== Terrain.Empty
            ) {
              console.error('Move is illegal')
              return false
              }
          } 
        }
      }
      return true
    }

    // Given a grid position, return the terrain types of all adjacent squares.
    public getAdjacentSquares(gridPos: GridPosition): GridPosition[] {
      const row = gridPos.row;
      const col = gridPos.col;

      const upGridPos: GridPosition = {row: row - 1, col: col } 
      const downGridPos: GridPosition = {row: row + 1, col: col} 
      const leftGridPos: GridPosition = {row: row, col: col - 1 }
      const rightGridPos: GridPosition = {row: row, col: col + 1 }

      upGridPos.terrain = this.coordWithinBounds(upGridPos) ? this.get(upGridPos) : Terrain.OutOfBounds
      downGridPos.terrain = this.coordWithinBounds(downGridPos) ? this.get(downGridPos) : Terrain.OutOfBounds
      leftGridPos.terrain = this.coordWithinBounds(leftGridPos) ? this.get(leftGridPos) : Terrain.OutOfBounds
      rightGridPos.terrain = this.coordWithinBounds(rightGridPos) ? this.get(rightGridPos) : Terrain.OutOfBounds

      return [
        upGridPos,
        downGridPos,
        leftGridPos,
        rightGridPos
      ]
    }

    // Given a terrain type, return an array of all clusters of that type on the grid
    public getClusters(terrain: Terrain): Cluster[] {
      let clusters: Cluster[] = [];

      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.grid[row][col] === terrain) {
            const gridPos = {row: row, col: col, terrain: terrain}
            let cluster = {
              terrain: terrain,
              gridPositions: []
            }
            const findClusterSquares = (cluster: Cluster, gridPos: GridPosition) => {
              if (gridPos.terrain === cluster.terrain && !cluster.gridPositions.includes(gridPos)) {
                cluster.gridPositions.push(gridPos);

                const adjacentSquares = this.getAdjacentSquares(gridPos);
                adjacentSquares.map(square => findClusterSquares(cluster, square))
              }
            }
            findClusterSquares(cluster, gridPos)
            clusters.push(cluster);
          }
        }
      }
      console.log('clusters:', clusters)
      return clusters;
    }

    // Given a scoring function, apply it to each square on the grid
    public applyScoringFunction(scoringFunction: (gridPos: GridPosition) => void ): void {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          const terrain = this.grid[row][col];
          scoringFunction({row: row, col: col, terrain: terrain});
        }
      }
    }

    // Given a grid position, check whether it is within the bounds of the grid
    private coordWithinBounds(gridPos: GridPosition): boolean {
      if ( gridPos.row < 0 || gridPos.row >= this.grid.length 
        || gridPos.col < 0 || gridPos.col >= this.grid[0].length) {
          return false
      }
      return true
    }
  }