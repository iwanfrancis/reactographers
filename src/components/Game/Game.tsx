import React from 'react';
import Board from '../Grid/Grid';
import styles from './Game.module.scss';
import { Props, State } from './types';
export default class Game extends React.PureComponent<Props, State> {
  state: State = {
    gridValues: new Array(11).fill(null).map(() => {
      return new Array(11).fill(false);
    }),
  };

  handleSquareClick = (x: number, y: number) => {
    const gridValues = this.state.gridValues;
    const newGridValues = gridValues.slice();
    newGridValues[x][y] = 'village';
    this.setState({ gridValues: newGridValues });
  };

  renderGrid() {
    const { rows, columns } = this.props;
    const { gridValues } = this.state;
    return <Board columns={columns} rows={rows} gridValues={gridValues} onSquareClick={this.handleSquareClick} />;
  }

  render() {
    return <div className={styles.gameWrapper}>{this.renderGrid()}</div>;
  }
}
