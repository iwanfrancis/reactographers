import React from 'react';

import { Card, ShapeCard, isShapeCard, Shape } from '../../constants/Card';
import { Terrain } from '../../constants/Terrains';
import styles from './CurrentCard.module.scss';

export interface Props {
  card: Card;
  setCurrentTerrain: (terrain: Terrain) => any;
  setCurrentShape: (shape: Shape) => any;
}

export default class CurrentCard extends React.PureComponent<Props> {

  renderTerrainOptions(terrains: Terrain[]) {
    const { setCurrentTerrain = ()=>{} } = this.props;
    return (
      <div className={styles.terrains}>
        {terrains.map(terrain => {
          return(
            <div key={terrain} className={styles.terrain} onClick={() => setCurrentTerrain(terrain)}>
              {terrain}
            </div>
          )
        })}
      </div>
    )
  }

  renderShapeOptions(shapes: Shape[]) {
    const { setCurrentShape = ()=>{} } = this.props;
    return (
      <div className={styles.shapes}>
        {shapes.map((shape, i) => {
            return(
              <div key={i} className={styles.shape} onClick={() => setCurrentShape(shape)}>
                shape
              </div>
            )
          })}
      </div>
    )
  }

  render() {
    const { card } = this.props;

    if (isShapeCard(card)) {
      const shapeCard = card as ShapeCard;
      return (
        <div className={styles.card}>
          <div className={styles.header}>
            {shapeCard.time}   {shapeCard.name}
          </div>
          <div className={styles.options}>
            {this.renderTerrainOptions(shapeCard.terrains)}
            {this.renderShapeOptions(shapeCard.shapes)}
          </div>
        </div>
      )
    }
  }
}