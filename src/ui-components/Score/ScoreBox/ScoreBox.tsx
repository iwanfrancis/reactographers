import React from "react";
import { Edict } from "../../../game-components/Edict";
import styles from "./ScoreBox.module.scss";
import { ReactComponent as MonsterBackground } from "../../../assets/sprites/monster/monster-outline.svg";

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
            {edictOneScore !== undefined ? (
              edictOneScore
            ) : (
              <div className={styles["edict-background"]}>{edictOne.code}</div>
            )}
          </td>
          <td className={styles["score-cell"]}>
            {edictTwoScore !== undefined ? (
              edictTwoScore
            ) : (
              <div className={styles["edict-background"]}>{edictTwo.code}</div>
            )}
          </td>
          <td rowSpan={2} className={styles["total-score"]}>
            {totalScore}
          </td>
        </tr>
        <tr className={styles["score-box-row"]}>
          <td className={styles["score-cell"]}>
            {coinScore !== undefined ? (
              coinScore
            ) : (
              <div className={styles["coin-background"]}></div>
            )}
          </td>
          <td className={styles["score-cell"]}>
            {monsterScore !== undefined ? (
              monsterScore
            ) : (
              <MonsterBackground className={styles["monster-background"]} />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
