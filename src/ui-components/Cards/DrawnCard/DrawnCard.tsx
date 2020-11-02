import React from "react";

import { AmbushCard, Card, isAmbushCard, isRuinsCard, isShapeCard } from "../../../models/Card";
import styles from "./DrawnCard.module.scss";
import { ReactComponent as Ruin } from "../../../assets/sprites/ruin/ruin.svg";
import SoloAmbushCorner from "../CurrentCard/CurrentAmbushCard/SoloAmbushCorner/SoloAmbushCorner";

export interface Props {
  card: Card;
  offset: number;
}

export default class DrawnCard extends React.PureComponent<Props> {
  render() {
    const { card, offset } = this.props;

    const offsetStyle = {
      top: `${offset}px`,
    };

    return (
      <div className={styles.card} style={offsetStyle}>
        <div className={styles.header}>
          {isRuinsCard(card) && <Ruin className={styles["ruins-header"]}></Ruin>}
          {isAmbushCard(card) && (
            <SoloAmbushCorner corner={(card as AmbushCard).soloAmbushCorner}></SoloAmbushCorner>
          )}
          {isShapeCard(card) && card.time}
        </div>
      </div>
    );
  }
}
