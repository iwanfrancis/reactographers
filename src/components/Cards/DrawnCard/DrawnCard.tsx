import React from 'react';
import classNames from 'classnames'

import { Card, ShapeCard, isShapeCard, Shape } from '../../../classes/Card';
import { Terrain } from '../../../constants/Terrains';
import styles from './DrawnCard.module.scss';

export interface Props {
  card: Card;
  offset: number;
}

export default class DrawnCard extends React.PureComponent<Props> {

  render() {
    const { card, offset } = this.props;

    const offsetStyle = {
      top: `${offset}px`
    }

    return (
      <div className={styles.card} style={offsetStyle}>
        <div className={styles.header}>
          {card.time} {card.name}
        </div>
      </div>
    )
  }
}