import React from 'react';

import Board from '../Grid/Grid';
import styles from './Game.module.scss';
import { Terrain } from '../../constants/Terrains';
import { FishingVillage, Shape } from '../../constants/ShapeCards';

export interface Props {
  columns: number;
  rows: number;
}

export interface GameState {
  gridData: Terrain[][]
}

export interface State {
  gameHistory: GameState[];
}

export default class Game extends React.PureComponent<Props, State> {
  // Set up initial game state
  state: State = {
    gameHistory: [{
      gridData: new Array(11).fill(null).map(() => {
        return new Array(11).fill(null);
      }),
    }]
  };

  // Maps a shape and terrain to the grid. Sets position 1,1 as the center point of the shape
  addShapeToGrid(gridData: Terrain[][], terrain: Terrain, shape: Shape, x: number, y: number) {
    for (let shX = 0; shX < 4; shX++) {
      for (let shY = 0; shY < 4; shY++) {
        if (shape[shX][shY]) {
          const xOffset = (x + shX - 1);
          const yOffset = (y + shY - 1);
          gridData[xOffset][yOffset] = terrain;
        } 
      }
    }
  }

  handleSquareClick = (x: number, y: number) => {
    const gameHistory = this.state.gameHistory;
    const currentgridData = gameHistory[gameHistory.length - 1].gridData;
    const newGridData = currentgridData.slice();
    this.addShapeToGrid(newGridData, Terrain.Village, FishingVillage.shapes[0][0], x, y)
    this.setState({
      gameHistory: gameHistory.concat([{
        gridData: newGridData,
      }])
    });
  };

  renderGrid() {
    const { rows, columns } = this.props;
    const gameHistory = this.state.gameHistory;
    const currentGridData = gameHistory[gameHistory.length - 1].gridData;
    return <Board columns={columns} rows={rows} gridData={currentGridData} onSquareClick={this.handleSquareClick} />;
  }

  render() {
    return <div className={styles.gameWrapper}>{this.renderGrid()}</div>;
  }
}
