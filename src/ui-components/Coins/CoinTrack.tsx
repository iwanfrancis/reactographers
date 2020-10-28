import classNames from "classnames";
import _ from "lodash";
import React from "react";
import styles from './CoinTrack.module.scss';

export interface CoinProps {
  coins: number;
}

export default function CoinTrack(props: CoinProps) {
  const playerCoins = props.coins;
  const totalPossibleCoins = 14
  const emptyCoinClass = classNames(styles.empty, styles.coin)
  const filledCoinClass = classNames(styles.filled, styles.coin)

  return (
    <div className={styles.track}>
      {
        _.times(totalPossibleCoins, (i) => {
          if ((i + 1) < playerCoins) {
            return <div key={`coin ${i}`} className={filledCoinClass}></div>
          } else return <div key={`coin ${i}`} className={emptyCoinClass}></div>
        })
      }
    </div>
  )
}