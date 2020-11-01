import React from "react";
import { RuinsCard } from "../../../../models/Card";
import styles from "./CurrentRuinsCard.module.scss";
import { ReactComponent as Ruin } from "../../../../assets/sprites/ruin/ruin.svg";

export interface CurrentRuinsCardProps {
  ruinsCard: RuinsCard;
  offsetStyle: any;
}

export default function CurrentRuinsCard(props: CurrentRuinsCardProps) {
  const { ruinsCard, offsetStyle } = props;

  return (
    <div className={styles.card} style={offsetStyle}>
      <div className={styles.header}>
        <Ruin className={styles["ruins-header"]} />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{ruinsCard.name}</div>
      </div>
      <div className={styles.options}>
        <Ruin className={styles["ruins-large"]} />
      </div>
    </div>
  );
}
