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
                    <div className={styles.header}>
                        {shapeCard.time}   {shapeCard.name}
                    </div>
                    <div className={styles.options}>
                        <div className={styles.terrains}>
                            {shapeCard.terrains.map(terrain => {
                                return(
                                    <div className={styles.terrain}>
                                        {terrain}
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.shapes}>
                            {shapeCard.shapes.map(shape => {
                                    return(
                                        <div className={styles.shape}>
                                            shape
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            )
        }
    }
}