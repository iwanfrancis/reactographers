import React from "react";
import { Edict } from "../../../game-components/Edict";
import styles from "./ScoreBox.module.scss";

export interface ScoreBoxProps {
  edictOne: Edict;
  edictOneScore: number | undefined;
  edictTwo: Edict;
  edictTwoScore: number | undefined;
  coinScore: number | undefined;
  monsterScore: number | undefined;
  totalScore: number | undefined;
}

export default function ScoreBox(props: ScoreBoxProps) {
  const {
    edictOne,
    edictOneScore,
    edictTwo,
    edictTwoScore,
    coinScore,
    monsterScore,
    totalScore,
  } = props;

  return (
    <table className={styles["score-box"]}>
      <tbody>
        <tr className={styles["score-box-row"]}>
          <td className={styles["score-cell"]}>
            {edictOneScore || <div className={styles["edict-background"]}>{edictOne.code}</div>}
          </td>
          <td className={styles["score-cell"]}>
            {edictTwoScore || <div className={styles["edict-background"]}>{edictTwo.code}</div>}
          </td>
          <td rowSpan={2} className={styles["total-score"]}>
            {totalScore}
          </td>
        </tr>
        <tr className={styles["score-box-row"]}>
          <td className={styles["score-cell"]}>{coinScore}</td>
          <td className={styles["score-cell"]}>{monsterScore}</td>
        </tr>
      </tbody>
    </table>
  );
}
