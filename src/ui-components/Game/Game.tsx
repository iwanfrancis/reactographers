import React, { useState } from 'react';
import _ from 'lodash';

import Grid from '../Grid/Grid';
import styles from './Game.module.scss';
import MapData from '../../classes/MapData';
import { Terrain } from '../../game-components/Terrains';
import { NormalMap } from '../../game-components/Maps';
import ExploreDeck from '../../classes/ExploreDeck';
import { Shape } from '../../models/Card';
import CurrentCard from '../Cards/CurrentCard/CurrentCard';
import Seasons, { Season } from '../../game-components/Seasons';
import SeasonCard from '../Cards/SeasonCard/SeasonCard';
import DrawnCard from '../Cards/DrawnCard/DrawnCard';
import { drawEdicts } from '../../game-components/ScoringCards';
import GridPosition from '../../models/GridPosition';
import ScoreCard from '../Cards/ScoreCard/ScoreCard';
import { render } from '@testing-library/react';

export interface State {
  mapHistory: MapData[];
  overlay: MapData;
  exploreDeck: ExploreDeck;
  currentSeason: Season;
  currentTerrain: Terrain;
  currentShape: Shape | null;
  currentRotation: number;
}

export default function Game() {
  const [mapHistory, setMapHistory] = useState([new MapData(NormalMap.grid)])
  const [overlay, setOverlay] = useState(new MapData(new Array(11).fill(null).map(() => new Array(11).fill(null))));
  const [exploreDeck] = useState(new ExploreDeck());
  const [currentSeason, setCurrentSeason] = useState<Season>(Seasons[0]);
  const [currentTerrain, setCurrentTerrain] = useState<Terrain>();
  const [currentShape, setCurrentShape] = useState<Shape>();
  const [currentRotation, setCurrentRotation] = useState(0);
  const [edicts, setEdicts] = useState(drawEdicts());

  const updateOverlay = (gridPos: GridPosition) => {
    if (currentTerrain && currentShape) {
      setOverlay(new MapData().addShape(currentTerrain, currentShape[currentRotation], gridPos));
    }
  }

  const rotateShape = (gridPos: GridPosition) => {
    let newRotation = currentRotation;

    if (currentTerrain && currentShape) {

      if ((currentShape.length - 1) <= currentRotation) {
        newRotation = 0;
      } else {
        newRotation = currentRotation + 1;
      }

      setCurrentRotation(newRotation);
      setOverlay(new MapData().addShape(currentTerrain, currentShape[newRotation], gridPos))
    }
  }

  const drawShape = (gridPos: GridPosition) => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    const newMapData = _.clone(currentMapData)
    
    if (currentTerrain && currentShape) {
      if (newMapData.moveIsLegal(currentShape[currentRotation], gridPos)) {
        newMapData.addShape(currentTerrain, currentShape[currentRotation], gridPos)
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
      
      const currentSeasonIndex = Seasons.indexOf(currentSeason);
      if (currentSeasonIndex >= Seasons.length -1) {
        console.log('end of game');
      } else {
        scoringPhase();
        setCurrentSeason(Seasons[currentSeasonIndex + 1]);
      }

      exploreDeck.reset();
      drawPhase();
    } else {
      drawPhase();
    }
  }

  const drawPhase = () => {
    exploreDeck.draw();
  }

  const scoringPhase = () => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    edicts.map(edicts => {
      edicts.scoringCard.score(currentMapData)
    })
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

  const renderEdicts = () => {
    return (
      edicts.map((edict) => {
        return (
          <ScoreCard 
            key={edict.scoringCard.name}
            card={edict.scoringCard}
            isActive={currentSeason.edicts.includes(edict.code)} 
            edictCode={edict.code}
          />
        )
      })
    )
  }

  const renderExploreCards = () => {
    const currentCard = exploreDeck.getCurrentCard();
    const previousCards = exploreDeck.getPreviousCards();

    return (
      <React.Fragment>
        {previousCards.map((card, i) => {
          return <DrawnCard key={card.name} card={card} offset={i * 50} />
        })}
        <CurrentCard 
          card={currentCard}
          currentShape={currentShape}
          setCurrentShape={setCurrentShape}
          currentTerrain={currentTerrain}
          setCurrentTerrain={setCurrentTerrain}
          offset={previousCards.length * 50}/>
      </React.Fragment>
    )
  }

  return (
    <div className={styles['game-wrapper']}>
      <div className={styles['left-section']}></div>
      <div className={styles['middle-section']}>
        <div className={styles['edict-container']}>
          {renderEdicts()}
        </div>
        <div className={styles['map-container']}>
          {renderGrid()}
        </div>
      </div>
      <div className={styles['right-section']}>
        <div className={styles['seasons-container']}>
          {renderSeasons()}
        </div>
        <div className={styles['explore-deck-container']}>
          {renderExploreCards()}
        </div>
      </div>
    </div>
  )
}
