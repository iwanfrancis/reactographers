import React from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import styles from './Game.module.scss';
import MapData from '../../classes/MapData';
import ShapeCards from '../../constants/ShapeCards';
import { Terrain } from '../../constants/Terrains';
import { NormalMap } from '../../constants/Maps';
import ExploreDeck from '../../classes/ExploreDeck';
import { Card } from '../../constants/Card';
import CurrentCard from '../CurrentCard/CurrentCard';

export interface Props {}

export interface State {
  mapHistory: MapData[];
  overlay: MapData;
  exploreDeck: ExploreDeck;
}

export default class Game extends React.PureComponent<Props, State> {
  // Set up initial game state
  state: State = {
    mapHistory: [new MapData(NormalMap.grid)],
    overlay: new MapData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    })),
    exploreDeck: new ExploreDeck()
  };

  handleSquareClick = (x: number, y: number) => {
    const mapHistory = this.state.mapHistory;
    const currentMapData = mapHistory[mapHistory.length - 1];
    const newMapData = _.clone(currentMapData)
    
    if (newMapData.moveIsLegal(ShapeCards[1].shapes[0][0], x, y)) {
      newMapData.addShape(Terrain.Monster,ShapeCards[1].shapes[0][0], x, y)
    }

    this.setState({
      mapHistory: mapHistory.concat([newMapData])
    });
  }

  handleSquareHoverOn = (x: number, y: number) => {
    const newOverlay = new MapData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    }));
    newOverlay.addShape(Terrain.Farm, ShapeCards[1].shapes[0][0], x, y)
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

  renderCurrentCard() {
    const currentCard = this.state.exploreDeck.draw();
    return (
      <CurrentCard card={currentCard} />
    )
  }

  render() {
    return (
      <div className={styles['game-wrapper']}>
        <div></div>
        <div>{this.renderGrid()}</div>
        <div>{this.renderCurrentCard()}</div>
      </div>
    )
  }
}
