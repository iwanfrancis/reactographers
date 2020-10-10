import React from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import styles from './Game.module.scss';
import MapData from '../../classes/MapData';
import ShapeCards from '../../constants/ShapeCards';
import { Terrain } from '../../constants/Terrains';
import { NormalMap } from '../../constants/Maps';
import ExploreDeck from '../../classes/ExploreDeck';
import { Card, Shape } from '../../constants/Card';
import CurrentCard from '../CurrentCard/CurrentCard';

export interface Props {}

export interface State {
  mapHistory: MapData[];
  overlay: MapData;
  exploreDeck: ExploreDeck;
  currentTerrain: Terrain | null;
  currentShape: Shape | null;
  currentRotation: number;
}

export default class Game extends React.PureComponent<Props, State> {
  // Set up initial game state
  state: State = {
    mapHistory: [new MapData(NormalMap.grid)],
    overlay: new MapData(new Array(11).fill(null).map(() => {
      return new Array(11).fill(null);
    })),
    exploreDeck: new ExploreDeck(),
    currentTerrain: null,
    currentShape: null,
    currentRotation: 0
  };


  handleSquareClick = (x: number, y: number) => {
    const { mapHistory, currentTerrain, currentShape, currentRotation } = this.state;
    const currentMapData = mapHistory[mapHistory.length - 1];
    const newMapData = _.clone(currentMapData)
    
    if (currentTerrain && currentShape) {
      if (newMapData.moveIsLegal(ShapeCards[1].shapes[0][0], x, y)) {
        newMapData.addShape(currentTerrain, currentShape[currentRotation], x, y)
      }
  
      this.setState({
        mapHistory: mapHistory.concat([newMapData])
      });
    }
  }

  setOverlay = (x: number, y: number) => {
    const { currentTerrain, currentShape, currentRotation } = this.state;

    if (currentTerrain && currentShape) {
      const newOverlay = new MapData(new Array(11).fill(null).map(() => {
        return new Array(11).fill(null);
      }));
      newOverlay.addShape(currentTerrain, currentShape[currentRotation], x, y)
      this.setState({
        overlay: newOverlay
      });
    }
  }

  handleShapeRotate = (x: number , y: number) => {
    const { currentShape, currentRotation } = this.state;
    let newRotation = currentRotation;
    if (currentShape) {
      if ((currentShape.length - 1) <= currentRotation) {
        newRotation = 0;
      } else {
        newRotation = currentRotation + 1;
      }

      this.setState({
        currentRotation: newRotation
      })

      this.setOverlay(x, y);
    }
  }

  setCurrentTerrain = (terrain: Terrain) => {
    this.setState({
      currentTerrain: terrain,
    })
  }

  setCurrentShape = (shape: Shape) => {
    this.setState({
      currentShape: shape,
      currentRotation: 0
    })
  }

  renderGrid() {
    const { mapHistory, overlay } = this.state;
    const currentMapData = mapHistory[mapHistory.length - 1]; 
    return (
      <Grid 
        mapData={currentMapData}
        overlay={overlay}
        onSquareClick={this.handleSquareClick} 
        onSquareHoverOn={this.setOverlay}
        onRotateShape={this.handleShapeRotate}/>
    )
  }

  renderCurrentCard() {
    const currentCard = this.state.exploreDeck.getCurrentCard();
    const {currentShape, currentTerrain } = this.state;
    return (
      <CurrentCard 
        card={currentCard}
        currentShape={currentShape}
        setCurrentShape={this.setCurrentShape}
        currentTerrain={currentTerrain}
        setCurrentTerrain={this.setCurrentTerrain}/>
    )
  }

  render() {
    return (
      <div className={styles['game-wrapper']}>
        <div className={styles['game-section']}> something</div>
        <div className={styles['game-section']}>{this.renderGrid()}</div>
        <div className={styles['game-section']}>{this.renderCurrentCard()}</div>
      </div>
    )
  }
}
