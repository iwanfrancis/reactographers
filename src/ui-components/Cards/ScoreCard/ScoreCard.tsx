import React from "react";

import styles from "./ScoreCard.module.scss";
import { ScoringCard } from "../../../game-components/ScoringCards";
import classNames from "classnames";
import { EdictCode } from "../../../game-components/Edict";

export interface Props {
  card: ScoringCard;
  isActive: boolean;
  edictCode: EdictCode;
}

export default class ScoreCard extends React.PureComponent<Props> {
  render() {
    const { card, isActive, edictCode } = this.props;

    const cardClass = classNames(styles.card, isActive ? styles.active : styles.notActive);

    return (
      <div className={cardClass}>
        <div className={styles.edict}>{edictCode}</div>
        <div className={styles.title}>{card.name}</div>
        <div className={styles.text}>
          {card.text.map((text, i) => {
            return <div key={"edict-text-" + i}>{text}</div>;
          })}
        </div>
      </div>
    );
  }
}
