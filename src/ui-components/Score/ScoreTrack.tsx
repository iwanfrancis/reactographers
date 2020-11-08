import React from "react";
import { SeasonScore } from "../../classes/Score";
import ScoreBox from "./ScoreBox/ScoreBox";
import styles from "./ScoreTrack.module.scss";

export interface ScoreTrackProps {
  seasonScores: SeasonScore[];
  totalScore: number | undefined;
}

export default function ScoreTrack(props: ScoreTrackProps) {
  const { seasonScores, totalScore } = props;

  return (
    <div className={styles["score-track"]}>
      {seasonScores.map((seasonScore, i) => {
        return (
          <React.Fragment key={`score-box-${i}`}>
            <ScoreBox {...seasonScore} />
            {i < seasonScores.length - 1 && "+"}
          </React.Fragment>
        );
      })}
      = <div className={styles["final-score-shield"]}>{totalScore}</div>
    </div>
  );
}
