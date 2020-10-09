import React from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import styles from './Game.module.scss';
import GridData from '../../modules/GridData';
import { Terrain } from '../../constants/Terrains';
import { FishingVillage } from '../../constants/ShapeCards';

export interface Props {
  columns: number;
  rows: number;
}

export interface GameState {
  gridData: GridData;
}

export interface State {
  gameHistory: GameState[];
  overlay: GridData;
}

export default class Game extends React.PureComponent<Props, State> {
  // Set up initial game state
  state: State = {
    gameHistory: [{
      gridData: new GridData(new Array(11).fill(null).map(() => {
        return new Array(11).fill(null);
      })),
    }],
    overlay: new GridData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    })),
  };

  handleSquareClick = (x: number, y: number) => {
    const gameHistory = this.state.gameHistory;
    const currentGridData = gameHistory[gameHistory.length - 1].gridData;
    const newGridData = _.clone(currentGridData)
    newGridData.addShape(Terrain.Monster, FishingVillage.shapes[0][0], x, y)
    this.setState({
      gameHistory: gameHistory.concat([{
        gridData: newGridData,
      }])
    });
  }

  handleSquareHoverOn = (x: number, y: number) => {
    const newOverlay = new GridData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    }));
    newOverlay.addShape(Terrain.Farm, FishingVillage.shapes[0][0], x, y)
    this.setState({
      overlay: newOverlay
    });
  }

  renderGrid() {
    const { rows, columns } = this.props;
    const { gameHistory, overlay } = this.state;
    const currentGridData = gameHistory[gameHistory.length - 1].gridData; 
    return (
      <Grid 
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
