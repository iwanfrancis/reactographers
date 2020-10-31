import classNames from "classnames";
import React from "react";
import { Season } from "../../../game-components/Seasons";
import styles from "./SeasonCard.module.scss";

export interface Props {
  season: Season;
  isCurrentSeason: boolean;
}

export default class SeasonCard extends React.PureComponent<Props> {
  render() {
    const { season, isCurrentSeason } = this.props;

    const cardClass = classNames(
      styles.card,
      isCurrentSeason ? styles.currentSeason : styles.notCurrentSeason
    );

    return (
      <div className={cardClass}>
        <div className={styles.header}>{season.length}</div>
        <div className={styles.body}>{season.name}</div>
        <div className={styles.edicts}>
          {season.edicts.map((edict) => {
            return (
              <div key={edict} className={styles.edict}>
                {edict}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
