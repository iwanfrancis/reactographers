import React from "react";
import MapData from "../../classes/MapData";
import { SeasonScore } from "../../classes/Score";
import GridPosition from "../../models/GridPosition";
import CoinTrack from "../Coins/CoinTrack";
import Grid from "../Grid/Grid";
import ScoreTrack from "../Score/ScoreTrack";
import styles from "./MapSheet.module.scss";

export interface MapSheetProps {
  mapData: MapData;
  overlay: MapData;
  ruinActive: boolean;
  currentMoveValid: boolean;
  onSquareClick: (gridPos: GridPosition) => void;
  onSquareHoverOn: (gridPos: GridPosition) => void;
  onRotateShape: (gridPos: GridPosition) => void;
  coins: number;
  seasonScores: SeasonScore[];
  finalScore: number | undefined;
}

export default function MapSheet(props: MapSheetProps) {
  return (
    <div className={styles["game-sheet"]}>
      <div className={styles["map-container"]}>
        <Grid
          mapData={props.mapData}
          overlay={props.overlay}
          onSquareClick={props.onSquareClick}
          onSquareHoverOn={props.onSquareHoverOn}
          onRotateShape={props.onRotateShape}
          ruinActive={props.ruinActive}
          currentMoveValid={props.currentMoveValid}
        />
      </div>
      <div className={styles["coin-track-container"]}>
        <CoinTrack coins={props.coins}></CoinTrack>
      </div>
      <div className={styles["score-track-container"]}>
        <ScoreTrack seasonScores={props.seasonScores} totalScore={props.finalScore} />
      </div>
    </div>
  );
}
