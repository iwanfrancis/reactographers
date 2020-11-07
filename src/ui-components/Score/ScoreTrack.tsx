import React from "react";
import Score, { SeasonScore } from "../../classes/Score";
import ScoreBox from "./ScoreBox/ScoreBox";
import styles from "./ScoreTrack.module.scss";

export interface ScoreTrackProps {
  seasonScores: SeasonScore[];
}

export default function ScoreTrack(props: ScoreTrackProps) {
  const { seasonScores } = props;

  return (
    <div className={styles["score-track"]}>
      {seasonScores.map((seasonScore) => (
        <ScoreBox {...seasonScore} />
      ))}
    </div>
  );
}
