import React, { useEffect, useState } from "react";
import _ from "lodash";

import Grid from "../Grid/Grid";
import styles from "./Game.module.scss";
import MapData from "../../classes/MapData";
import { Terrain } from "../../game-components/Terrains";
import { NormalMap } from "../../game-components/Maps";
import ExploreDeck from "../../classes/ExploreDeck";
import { isAmbushCard, isRuinsCard, isShapeCard, Shape, ShapeCard } from "../../models/Card";
import CurrentCard from "../Cards/CurrentCard/CurrentCard";
import Seasons, { Season } from "../../game-components/Seasons";
import SeasonCard from "../Cards/SeasonCard/SeasonCard";
import DrawnCard from "../Cards/DrawnCard/DrawnCard";
import { drawEdicts } from "../../game-components/ScoringCards";
import GridPosition from "../../models/GridPosition";
import ScoreCard from "../Cards/ScoreCard/ScoreCard";
import CoinTrack from "../Coins/CoinTrack";
import { Phase } from "../../game-components/Phase";
import { FallbackShape } from "../../constants/FallbackShape";

export default function Game() {
  const [mapHistory, setMapHistory] = useState([new MapData(NormalMap.grid, NormalMap.ruins)]);
  const [exploreDeckHistory, setExploreDeckHistory] = useState([new ExploreDeck()]);
  const [edicts] = useState(drawEdicts());
  const [currentSeason, setCurrentSeason] = useState<Season>(Seasons[0]);
  const [currentTerrain, setCurrentTerrain] = useState<Terrain>();
  const [currentShape, setCurrentShape] = useState<Shape>();
  const [currentRotation, setCurrentRotation] = useState(0);
  const [possibleShapes, setPossibleShapes] = useState<Shape[]>([]);
  const [ruinActive, setRuinActive] = useState(false);
  const [reputation, setReputation] = useState(0);
  const [coins, setCoins] = useState(0);
  const [phase, setPhase] = useState(Phase.Explore);
  const [overlay, setOverlay] = useState(
    new MapData(
      new Array(NormalMap.rows).fill(null).map(() => new Array(NormalMap.cols).fill(null))
    )
  );

  useEffect(() => {
    switch (phase) {
      case Phase.Explore:
        explorePhase();
        break;
      case Phase.Ambush:
        ambushPhase();
        break;
      case Phase.Draw:
        break;
      case Phase.Check:
        checkPhase();
        break;
      case Phase.Score:
        scoringPhase();
        break;
      case Phase.End:
        console.log(`Game over! Final score: ${reputation}`);
    }
  }, [phase]);

  const updateOverlay = (gridPos: GridPosition) => {
    if (currentTerrain && currentShape) {
      setOverlay(new MapData().addShape(currentTerrain, currentShape[currentRotation], gridPos));
    }
  };

  const rotateShape = (gridPos: GridPosition) => {
    let newRotation = currentRotation;

    if (currentTerrain && currentShape) {
      if (currentShape.length - 1 <= currentRotation) {
        newRotation = 0;
      } else {
        newRotation = currentRotation + 1;
      }

      setCurrentRotation(newRotation);
      setOverlay(new MapData().addShape(currentTerrain, currentShape[newRotation], gridPos));
    }
  };

  const explorePhase = async () => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    const currentExploreDeck = exploreDeckHistory[exploreDeckHistory.length - 1];
    let ruinsCardDrawn = false;
    let ambushCardDrawn = false;
    let nextCard = currentExploreDeck.draw();
    setExploreDeckHistory(exploreDeckHistory.concat(currentExploreDeck));

    // If we get a ruins card, keep drawing until we get something else
    if (isRuinsCard(nextCard)) {
      setRuinActive(ruinsCardDrawn);
      ruinsCardDrawn = true;
      let drawAnother = true;

      while (drawAnother) {
        await new Promise((r) => setTimeout(r, 1000));
        nextCard = currentExploreDeck.draw();
        setExploreDeckHistory(exploreDeckHistory.concat(currentExploreDeck));

        if (!isRuinsCard(nextCard)) {
          drawAnother = false;
        }
      }
    }

    if (isAmbushCard(nextCard)) {
      await new Promise((r) => setTimeout(r, 2000));
      setPhase(Phase.Ambush);
    }

    // Once we have shape card, calculate whether or not it's shapes are possible
    if (isShapeCard(nextCard)) {
      const possibleShapes = nextCard.shapes.filter((shape) => {
        return currentMapData.shapeIsPossible(shape, ruinsCardDrawn);
      });

      if (possibleShapes.length == 0) {
        setCurrentShape(FallbackShape);
      }

      setPossibleShapes(possibleShapes);
      setPhase(Phase.Draw);
    }
  };

  const ambushPhase = async () => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    const currentExploreDeck = exploreDeckHistory[exploreDeckHistory.length - 1];
    const currentCard = currentExploreDeck.getCurrentCard();
    if (isAmbushCard(currentCard)) {
      await currentMapData.addMonster(
        currentCard.shape[0],
        currentCard.soloAmbushCorner,
        currentCard.soloAmbushDirection,
        setOverlay
      );
    }

    setPhase(Phase.Check);
  };

  const drawShape = (gridPos: GridPosition) => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    const currentExploreDeck = exploreDeckHistory[exploreDeckHistory.length - 1];
    const newMapData = _.clone(currentMapData);

    if (currentTerrain && currentShape) {
      if (
        newMapData.moveIsLegal(
          currentShape[currentRotation],
          gridPos,
          ruinActive && currentShape !== FallbackShape
        )
      ) {
        newMapData.addShape(currentTerrain, currentShape[currentRotation], gridPos);

        let newCoins = newMapData.checkForNewSurroundedMountains();
        if (currentExploreDeck.currentShapeHasCoin(currentShape)) {
          console.log("Shape had coin! +1 Coin");
          newCoins++;
        }

        setRuinActive(false);
        setCoins(coins + newCoins);
        setMapHistory(mapHistory.concat([newMapData]));
        setPhase(Phase.Check);
      }
    }
  };

  const checkPhase = () => {
    const currentExploreDeck = exploreDeckHistory[exploreDeckHistory.length - 1];
    const timeInSeason = currentExploreDeck.getTotalTime();

    setCurrentShape(undefined);
    setCurrentTerrain(undefined);
    setCurrentRotation(0);

    if (timeInSeason >= currentSeason.length) {
      console.log(`End of ${currentSeason.name}`);
      setPhase(Phase.Score);
    } else {
      setPhase(Phase.Explore);
    }
  };

  const scoringPhase = () => {
    console.log("Begin scoring phase");

    const currentMapData = mapHistory[mapHistory.length - 1];
    const currentExploreDeck = exploreDeckHistory[exploreDeckHistory.length - 1];
    let seasonScore = 0;

    edicts.forEach((edict) => {
      if (currentSeason.edicts.includes(edict.code)) {
        console.log(`Scoring edict ${edict.code} (${edict.scoringCard.name})`);
        const score = edict.scoringCard.score(currentMapData);
        console.log(`Got ${score} reputation points`);
        seasonScore += score;
      }
    });

    console.log(`${coins} coin${coins < 1 || coins > 1 ? "s" : ""}. +${coins} reputation`);
    seasonScore += coins;

    console.log(`Season score: ${seasonScore}`);
    console.log(`Total score: ${reputation + seasonScore}`);
    setReputation(reputation + seasonScore);

    const currentSeasonIndex = Seasons.indexOf(currentSeason);
    if (currentSeasonIndex >= Seasons.length - 1) {
      setPhase(Phase.End);
    } else {
      currentExploreDeck.reset();
      setExploreDeckHistory(exploreDeckHistory.concat(currentExploreDeck));

      const currentSeasonIndex = Seasons.indexOf(currentSeason);
      const nextSeason = Seasons[currentSeasonIndex + 1];

      console.log(`Beginning of ${nextSeason.name}`);
      setCurrentSeason(nextSeason);
      setPhase(Phase.Explore);
    }
  };

  const renderGrid = () => {
    const currentMapData = mapHistory[mapHistory.length - 1];
    return (
      <Grid
        mapData={currentMapData}
        overlay={overlay}
        onSquareClick={drawShape}
        onSquareHoverOn={updateOverlay}
        onRotateShape={rotateShape}
      />
    );
  };

  const renderSeasons = () => {
    return Seasons.map((season) => {
      return (
        <SeasonCard key={season.name} season={season} isCurrentSeason={season === currentSeason} />
      );
    });
  };

  const renderEdicts = () => {
    return edicts.map((edict) => {
      return (
        <ScoreCard
          key={edict.scoringCard.name}
          card={edict.scoringCard}
          isActive={currentSeason.edicts.includes(edict.code)}
          edictCode={edict.code}
        />
      );
    });
  };

  const renderExploreCards = () => {
    const currentExploreDeck = exploreDeckHistory[exploreDeckHistory.length - 1];
    const currentCard = currentExploreDeck.getCurrentCard();
    const previousCards = currentExploreDeck.getPreviousCards();

    return (
      <React.Fragment>
        {previousCards.map((card, i) => {
          return <DrawnCard key={card.name} card={card} offset={i * 50} />;
        })}
        {currentCard && (
          <CurrentCard
            card={currentCard}
            currentShape={currentShape}
            setCurrentShape={setCurrentShape}
            currentTerrain={currentTerrain}
            setCurrentTerrain={setCurrentTerrain}
            possibleShapes={possibleShapes}
            ruinsActive={ruinActive}
            offset={previousCards.length * 50}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={styles["game-wrapper"]}>
      <div className={styles["left-section"]}></div>
      <div className={styles["middle-section"]}>
        <div className={styles["edict-container"]}>{renderEdicts()}</div>
        <div className={styles["map-container"]}>{renderGrid()}</div>
        <div className={styles["coin-track-container"]}>
          <CoinTrack coins={coins}></CoinTrack>
        </div>
      </div>
      <div className={styles["right-section"]}>
        <div className={styles["seasons-container"]}>{renderSeasons()}</div>
        <div className={styles["explore-deck-container"]}>{renderExploreCards()}</div>
      </div>
    </div>
  );
}
