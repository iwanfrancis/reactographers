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
  overlay: Terrain[][];
}

export default class Game extends React.PureComponent<Props, State> {
  // Set up initial game state
  state: State = {
    gameHistory: [{
      gridData: new Array(11).fill(null).map(() => {
        return new Array(11).fill(null);
      }),
    }],
    overlay: new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    }),
  };

  // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
  addShapeToGrid(gridData: Terrain[][], terrain: Terrain, shape: Shape, x: number, y: number) {
    const newGridData = gridData.slice()
    for (let shX = 0; shX < 4; shX++) {
      for (let shY = 0; shY < 4; shY++) {
        if (shape[shX][shY]) {
          const xOffset = (x + shX - 1);
          const yOffset = (y + shY - 1);
          newGridData[xOffset][yOffset] = terrain;
        } 
      }
    }
    return newGridData;
  }

  handleSquareClick = (x: number, y: number) => {
    const gameHistory = this.state.gameHistory;
    const currentgridData = gameHistory[gameHistory.length - 1].gridData;
    const newGridData = this.addShapeToGrid(currentgridData, Terrain.Village, FishingVillage.shapes[0][0], x, y)
    this.setState({
      gameHistory: gameHistory.concat([{
        gridData: newGridData,
      }])
    });
  }

  handleSquareHoverOn = (x: number, y: number) => {
    let emptyOverlay = new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    })
    const newOverlay = this.addShapeToGrid(emptyOverlay, Terrain.Farm, FishingVillage.shapes[0][0], x, y)
    this.setState({
      overlay: newOverlay
    });
  }

  renderGrid() {
    const { rows, columns } = this.props;
    const { gameHistory, overlay } = this.state;
    const currentGridData = gameHistory[gameHistory.length - 1].gridData; 
    return (
      <Board 
        columns={columns} 
        rows={rows}
        gridData={currentGridData}
        overlay={overlay}
        onSquareClick={this.handleSquareClick} 
        onSquareHoverOn={this.handleSquareHoverOn}/>
    )
  }

  render() {
    return <div className={styles.gameWrapper}>{this.renderGrid()}</div>;
  }
}
