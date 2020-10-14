import React from "react";
import { Season } from "../../constants/Seasons";
import styles from "./SeasonCard.module.scss";

export interface Props {
  season: Season
}

export default class SeasonCard extends React.PureComponent<Props> {

  render() {
    const season = this.props.season;
    
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          {season.length}
        </div>
        <div className={styles.body}>
          {season.name}
        </div>
        <div className={styles.edicts}>
          {season.edicts.map(edict => {
            return (
              <div className={styles.edict}>
                {edict}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
