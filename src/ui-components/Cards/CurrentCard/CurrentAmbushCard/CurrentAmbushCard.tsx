import _ from "lodash";
import React from "react";
import { Terrain } from "../../../../game-components/Terrains";
import { AmbushCard } from "../../../../models/Card";
import { SoloAmbushDirection } from "../../../../models/SoloAmbushDirection";
import SoloAmbushCorner from "./SoloAmbushCorner/SoloAmbushCorner";
import CardShape from "../../CardShape/CardShape";
import styles from "./CurrentAmbushCard.module.scss";
import { ReactComponent as AmbushClockwise } from "../../../../assets/sprites/ambush-clockwise/ambush-clockwise.svg";
import { ReactComponent as AmbushAntiClockwise } from "../../../../assets/sprites/ambush-anti-clockwise/ambush-anti-clockwise.svg";

export interface CurrentAmbushCardProps {
  ambushCard: AmbushCard;
  offsetStyle: any;
}

export default function CurrentAmbushCard(props: CurrentAmbushCardProps) {
  const { ambushCard, offsetStyle } = props;

  return (
    <div className={styles.card} style={offsetStyle}>
      <div className={styles.header}>
        <SoloAmbushCorner corner={ambushCard.soloAmbushCorner}></SoloAmbushCorner>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{ambushCard.name}</div>
      </div>
      <div className={styles.options}>
        <div className={styles["ambush-info"]}>
          <div className={styles["ambush-direction"]}>
            <div className={styles["ambush-direction-square"]}></div>
            {ambushCard.soloAmbushDirection === SoloAmbushDirection.Clockwise ? (
              <AmbushClockwise className={styles["ambush-direction-svg"]}></AmbushClockwise>
            ) : (
              <AmbushAntiClockwise className={styles["ambush-direction-svg"]}></AmbushAntiClockwise>
            )}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.shape}>
            <CardShape shape={ambushCard.shape} terrain={Terrain.Monster} />
          </div>
        </div>
      </div>
    </div>
  );
}
