import React from 'react';
import Board from './components/Grid/Grid';
import styles from './Game.module.scss';
import { Props, State } from './types';
export default class Game extends React.PureComponent<Props, State> {
  state: State = {
    gridValues: Array(11).fill(Array(11).fill(null)),
  };

  handleTileClick = (squareId: string) => {
    // TODO
  };

  renderGrid() {
    const { rows, columns } = this.props;
    const { gridValues } = this.state;
    return <Board columns={columns} rows={rows} gridValues={gridValues} />;
  }

  render() {
    return <div className={styles.gameWrapper}>{this.renderGrid()}</div>;
  }
}
