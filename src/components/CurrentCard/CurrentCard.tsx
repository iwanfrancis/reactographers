import React from 'react';
import classNames from 'classnames'

import { Card, ShapeCard, isShapeCard, Shape } from '../../classes/Card';
import { Terrain } from '../../constants/Terrains';
import styles from './CurrentCard.module.scss';
import terrainStyles from '../../constants/Terrains.module.scss'
import CardShape from './CardShape/CardShape';

export interface Props {
  card: Card;
  currentTerrain: Terrain | null;
  currentShape: Shape | null;
  setCurrentTerrain: (terrain: Terrain) => any;
  setCurrentShape: (shape: Shape) => any;
}

export default class CurrentCard extends React.PureComponent<Props> {


  renderTerrainOptions(terrains: Terrain[]) {
    const { currentTerrain, setCurrentTerrain = ()=>{} } = this.props;
    return (
      <div className={styles.terrains}>
        {terrains.map((terrain, i) => {
          const active = (terrain === currentTerrain) ? styles.active : undefined
          const terrainContainerClass = classNames(active, styles.terrain)
          const terrainIconClass = classNames(styles['terrain-icon'], terrainStyles[terrain])
          return (
            <React.Fragment key={terrain}>
              {i > 0 && <div className={styles.divider}></div>}
              <div  className={terrainContainerClass} onClick={() => setCurrentTerrain(terrain)}>
                <div className={terrainIconClass}></div>
              </div>
            </React.Fragment>
          )})
        }
      </div>
    )
  }

  renderShapeOptions(shapes: Shape[]) {
    const { currentShape, setCurrentShape = ()=>{} } = this.props;
    return (
      <div className={styles.shapes}>
        {shapes.map((shape, i) => {
           const active = (shape === currentShape) ? styles.active : undefined
           const shapeContainerClass = classNames(active, styles.shape)
          return (
            <React.Fragment key={i}>
              {i > 0 && <div className={styles.divider}></div>}
              <div className={shapeContainerClass} onClick={() => setCurrentShape(shape)}>
                <CardShape shape={shape}/>
              </div>
            </React.Fragment>
          )})
        }
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
            {shapeCard.time}
          </div>
          <div className={styles.body}>
            <div className={styles.title}>
              {shapeCard.name}
            </div>
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