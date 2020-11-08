import classNames from "classnames";
import _ from "lodash";
import React from "react";
import styles from "./CoinTrack.module.scss";

export interface CoinProps {
  coins: number;
}

export default function CoinTrack(props: CoinProps) {
  const playerCoins = props.coins;
  const totalPossibleCoins = 14;

  return (
    <div className={styles.track}>
      {_.times(totalPossibleCoins, (i) => {
        const coinClass = classNames(
          styles.coin,
          styles.empty,
          i + 1 <= playerCoins && styles.filled
        );
        return <div key={`coin ${i}`} className={coinClass}></div>;
      })}
    </div>
  );
}
