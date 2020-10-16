import { ShapeRotation } from "../models/Card";
import { Terrain } from "../models/Terrains";
import { MapSize } from "../models/Maps";
import GridPosition from "../models/GridPosition";

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
  
    public get(row: number, col: number) {
      return this.grid[row][col];
    }
  
    // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
    public addShape(terrain: Terrain, shape: ShapeRotation, gridPos: GridPosition) {
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
    public moveIsLegal(shape: ShapeRotation, gridPos: GridPosition) {
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
    public getAdjacentSquares(gridPos: GridPosition) {
      const row = gridPos.row;
      const col = gridPos.col;

      return {
        up: this.coordWithinBounds({row: row - 1, col: col }) ? this.grid[row - 1][col] : Terrain.OutOfBounds,
        down: this.coordWithinBounds({row: row + 1, col: col }) ? this.grid[row + 1][col] : Terrain.OutOfBounds,
        left: this.coordWithinBounds({row: row, col: col - 1 }) ? this.grid[row][col - 1] : Terrain.OutOfBounds,
        right: this.coordWithinBounds({row: row, col: col + 1 }) ? this.grid[row][col + 1] : Terrain.OutOfBounds
      }
    }

    // Given a scoring function, apply the scoring function to each square on the grid
    public applyScoringFunction(scoringFunction: (gridPos: GridPosition, terrain: Terrain) => void ) {
      for (let row = 0; row < this.grid[0].length; row++) {
        for (let col = 0; col < this.grid.length; col++) {
          const terrain = this.grid[row][col];
          scoringFunction({row: row, col: col}, terrain);
        }
      }
    }

    // Given a grid position, check whether it is within the bounds of the grid
    private coordWithinBounds(gridPos: GridPosition) {
      if ( gridPos.row < 0 || gridPos.row >= this.grid.length 
        || gridPos.col < 0 || gridPos.col >= this.grid[0].length) {
          return false
      }
      return true
    }
  }