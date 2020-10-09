import React from 'react';

import Board from '../Grid/Grid';
import styles from './Game.module.scss';
import { Terrain } from '../../constants/Terrains';

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

  handleSquareClick = (x: number, y: number) => {
    const gameHistory = this.state.gameHistory;
    const currentgridData = gameHistory[gameHistory.length - 1].gridData;
    const newGridData = currentgridData.slice();
    newGridData[x][y] = Terrain.Village;
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
