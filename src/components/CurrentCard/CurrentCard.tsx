import React from 'react';

import { Card, ShapeCard, isShapeCard } from '../../constants/Card';
import styles from './CurrentCard.module.scss';

export interface Props {
    card: Card;
}

export default class CurrentCard extends React.PureComponent<Props> {

    render() {
        const card = this.props.card;

        if (isShapeCard(card)) {
            const shapeCard = card as ShapeCard;
            return (
                <div className={styles.card}>
                    <div>{shapeCard.time}{shapeCard.name}</div>
                    <div>
                        {shapeCard.terrains}
                    </div>
                    <div>
                        shapes
                    </div>
                </div>
            )
        }
    }
}