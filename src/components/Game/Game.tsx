import React, { useState } from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import styles from './Game.module.scss';
import MapData from '../../classes/MapData';
import { Terrain } from '../../constants/Terrains';
import { NormalMap } from '../../constants/Maps';
import ExploreDeck from '../../classes/ExploreDeck';
import { Shape, ShapeRotation } from '../../classes/Card';
import CurrentCard from '../CurrentCard/CurrentCard';
import Seasons, { Season } from '../../constants/Seasons';
import SeasonCard from '../SeasonCard/SeasonCard';

export interface State {
  mapHistory: MapData[];
  overlay: MapData;
  exploreDeck: ExploreDeck;
  currentSeason: Season;
  currentTerrain: Terrain | null;
  currentShape: Shape | null;
  currentRotation: number;
}

export default function Game() {

  const [mapHistory, setMapHistory] = useState([new MapData(NormalMap.grid)])
  const [overlay, setOverlay] = useState(new MapData(new Array(11).fill(null).map(() => new Array(11).fill(null))));
  const [exploreDeck, setExploreDeck] = useState(new ExploreDeck);
  const [currentSeason, setCurrentSeason] = useState<Season>(Seasons[0]);
  const [currentTerrain, setCurrentTerrain] = useState<Terrain>();
  const [currentShape, setCurrentShape] = useState<Shape>();
  const [currentRotation, setCurrentRotation] = useState(0);

  const updateOverlay = (x: number, y: number) => {
    if (currentTerrain && currentShape) {
      setOverlay(new MapData().addShape(currentTerrain, currentShape[currentRotation], x, y));
    }
  }

  const rotateShape = (x: number , y: number) => {
    let newRotation = currentRotation;

    if (currentTerrain && currentShape) {

      if ((currentShape.length - 1) <= currentRotation) {
        newRotation = 0;
      } else {
        newRotation = currentRotation + 1;
      }

      setCurrentRotation(newRotation);
      setOverlay(new MapData().addShape(currentTerrain, currentShape[newRotation], x, y))
    }
  }

  const drawShape = (x: number, y: number) => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    const newMapData = _.clone(currentMapData)
    
    if (currentTerrain && currentShape) {
      if (newMapData.moveIsLegal(currentShape[currentRotation], x, y)) {
        newMapData.addShape(currentTerrain, currentShape[currentRotation], x, y)
      }
  
      setMapHistory(mapHistory.concat([newMapData]));
      checkPhase();
    }
  }

  const checkPhase = () => {
    const timeInSeason = exploreDeck.getTotalTime();

    setCurrentShape(undefined);
    setCurrentTerrain(undefined);
    setCurrentRotation(0);

    if (timeInSeason >= currentSeason.length) {
      console.log('end of season')
    } else {
      drawPhase();
    }
  }


  const drawPhase = () => {
    exploreDeck.draw();
  }

  const renderGrid = () => {
    const currentMapData = mapHistory[mapHistory.length - 1]; 
    return (
      <Grid 
        mapData={currentMapData}
        overlay={overlay}
        onSquareClick={drawShape} 
        onSquareHoverOn={updateOverlay}
        onRotateShape={rotateShape}/>
    )
  }
  
  const renderSeasons = () => {
    return (
      Seasons.map(season => {
        return <SeasonCard key={season.name} season={season} isCurrentSeason={season === currentSeason} />
      })
    )
  }

  const renderCurrentCard = () => {
    const currentCard = exploreDeck.getCurrentCard();
    return (
      <CurrentCard 
        card={currentCard}
        currentShape={currentShape}
        setCurrentShape={setCurrentShape}
        currentTerrain={currentTerrain}
        setCurrentTerrain={setCurrentTerrain}/>
    )
  }

  return (
    <div className={styles['game-wrapper']}>
      <div className={styles['game-section']}>something</div>
      <div className={styles['game-section']}>{renderGrid()}</div>
      <div className={styles['card-section']}>
        <div className={styles['seasons-container']}>
          {renderSeasons()}
        </div>
        <div className={styles['explore-deck-container']}>
          {renderCurrentCard()}
        </div>
      </div>
    </div>
  )
}
