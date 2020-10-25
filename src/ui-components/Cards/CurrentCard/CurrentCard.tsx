import React from 'react';
import classNames from 'classnames'

import { Card, ShapeCard, isShapeCard, Shape } from '../../../models/Card';
import { Terrain } from '../../../game-components/Terrains';
import styles from './CurrentCard.module.scss';
import CardShape from '../CardShape/CardShape';

export interface Props {
  card: Card;
  currentTerrain: Terrain | undefined;
  currentShape: Shape | undefined;
  setCurrentTerrain: React.Dispatch<React.SetStateAction<Terrain | undefined>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<Shape | undefined>>;
  offset: number;
}

export default class CurrentCard extends React.PureComponent<Props> {


  renderTerrainOptions(terrains: Terrain[]) {
    const { currentTerrain, setCurrentTerrain = ()=>{} } = this.props;
    return (
      <div className={styles.terrains}>
        {terrains.map((terrain, i) => {
          const active = (terrain === currentTerrain) ? styles.active : undefined
          const terrainContainerClass = classNames(active, styles.terrain)
          const terrainIconClass = classNames(styles['terrain-icon'], styles[terrain])
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

  renderShapeOptions(shapes: Shape[], coinIndex = -1) {
    const { currentShape, setCurrentShape = ()=>{} } = this.props;
    return (
      <div className={styles.shapes}>
        {shapes.map((shape, i) => {
           const active = (shape === currentShape) ? styles.active : undefined
           const hasCoin = coinIndex === i;
           const shapeContainerClass = classNames(active, styles.shape)
          return (
            <React.Fragment key={i}>
              {i > 0 && <div className={styles.divider}></div>}
              <div className={shapeContainerClass} onClick={() => setCurrentShape(shape)}>
                <CardShape shape={shape}/>
                {hasCoin && <div className={styles.coin}></div>}
              </div>
            </React.Fragment>
          )})
        }
      </div>
    )
  }

  render() {
    const { card, offset } = this.props;

    const offsetStyle = {
      top: `${offset}px`
    }

    if (isShapeCard(card)) {
      const shapeCard = card as ShapeCard;
      return (
        <div className={styles.card} style={offsetStyle}>
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
            {this.renderShapeOptions(shapeCard.shapes, shapeCard.coinIndex)}
          </div>
        </div>
      )
    }
  }
}