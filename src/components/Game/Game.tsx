import React from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import styles from './Game.module.scss';
import MapData from '../../classes/MapData';
import { Terrain } from '../../constants/Terrains';
import { FishingVillage } from '../../constants/ShapeCards';
import { NormalMap } from '../../constants/Maps';

export interface Props {}

export interface State {
  mapHistory: MapData[];
  overlay: MapData;
}

export default class Game extends React.PureComponent<Props, State> {
  // Set up initial game state
  state: State = {
    mapHistory: [new MapData(NormalMap.grid)],
    overlay: new MapData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    })),
  };

  handleSquareClick = (x: number, y: number) => {
    const mapHistory = this.state.mapHistory;
    const currentMapData = mapHistory[mapHistory.length - 1];
    const newMapData = _.clone(currentMapData)
    
    if (newMapData.moveIsLegal(FishingVillage.shapes[0][0], x, y)) {
      newMapData.addShape(Terrain.Monster, FishingVillage.shapes[0][0], x, y)
    }

    this.setState({
      mapHistory: mapHistory.concat([newMapData])
    });
  }

  handleSquareHoverOn = (x: number, y: number) => {
    const newOverlay = new MapData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    }));
    newOverlay.addShape(Terrain.Farm, FishingVillage.shapes[0][0], x, y)
    this.setState({
      overlay: newOverlay
    });
  }

  renderGrid() {
    const { mapHistory, overlay } = this.state;
    const currentMapData = mapHistory[mapHistory.length - 1]; 
    return (
      <Grid 
        mapData={currentMapData}
        overlay={overlay}
        onSquareClick={this.handleSquareClick} 
        onSquareHoverOn={this.handleSquareHoverOn}/>
    )
  }

  render() {
    return <div className={styles.gameWrapper}>{this.renderGrid()}</div>;
  }
}
