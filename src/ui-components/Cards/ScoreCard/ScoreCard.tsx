import React from 'react';

import { ShapeCard, isShapeCard } from '../../../models/Card';
import styles from './ScoreCard.module.scss';
import { ScoringCard } from '../../../game-components/ScoringCards';
import classNames from 'classnames';

export interface Props {
  card: ScoringCard;
  isActive: boolean;
}

export default class ScoreCard extends React.PureComponent<Props> {

  render() {
    const { card, isActive } = this.props;

    const cardClass = classNames(styles.card, isActive ? styles.active : styles.notActive);

    return (
      <div className={cardClass}>
        <div className={styles.title}>
          {card.name}
        </div>
        <div className={styles.text}>
          {card.text.map(text => {
            return <div>{text}</div>
          })}
        </div>
      </div>
    )
  }
}