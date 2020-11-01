import classNames from "classnames";
import React from "react";
import { Terrain } from "../../../../game-components/Terrains";
import { ShapeCard, Shape } from "../../../../models/Card";
import CardShape from "../../CardShape/CardShape";
import styles from "./CurrentShapeCard.module.scss";

export interface CurrentShapeCardProps {
  shapeCard: ShapeCard;
  offsetStyle: any;
  ruinsActive: boolean;
  possibleShapes: Shape[];
  currentTerrain: Terrain | undefined;
  currentShape: Shape | undefined;
  setCurrentTerrain: React.Dispatch<React.SetStateAction<Terrain | undefined>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<Shape | undefined>>;
}

export default function CurrentShapeCard(props: CurrentShapeCardProps) {
  const {
    shapeCard,
    offsetStyle,
    ruinsActive,
    possibleShapes,
    currentShape,
    currentTerrain,
    setCurrentShape,
    setCurrentTerrain,
  } = props;

  const renderTerrainOptions = (terrains: Terrain[]) => {
    if (ruinsActive && possibleShapes.length === 0) {
      terrains = [Terrain.Forest, Terrain.Village, Terrain.Farm, Terrain.Water, Terrain.Monster];
    }
    return (
      <div className={styles.terrains}>
        {terrains.map((terrain, i) => {
          const active = terrain === currentTerrain ? styles.active : undefined;
          const terrainContainerClass = classNames(active, styles.terrain);
          const terrainIconClass = classNames(styles["terrain-icon"], styles[terrain]);
          return (
            <React.Fragment key={terrain}>
              {i > 0 && <div className={styles.divider}></div>}
              <div className={terrainContainerClass} onClick={() => setCurrentTerrain(terrain)}>
                <div className={terrainIconClass}></div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderShapeOptions = (shapes: Shape[], coinIndex = -1) => {
    return (
      <div className={styles.shapes}>
        {shapes.map((shape, i) => {
          const active = shape === currentShape;
          const hasCoin = coinIndex === i;
          const possible = possibleShapes.includes(shape);
          const shapeContainerClass = classNames(
            active ? styles.active : undefined,
            possible ? undefined : styles.impossible,
            styles.shape
          );
          return (
            <React.Fragment key={i}>
              {i > 0 && <div className={styles.divider}></div>}
              <div
                className={shapeContainerClass}
                onClick={possible ? () => setCurrentShape(shape) : undefined}
              >
                <CardShape shape={shape} />
                {hasCoin && <div className={styles.coin}></div>}
                {!possible && <div className={styles["impossible-overlay"]}></div>}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.card} style={offsetStyle}>
      <div className={styles.header}>{shapeCard.time}</div>
      <div className={styles.body}>
        <div className={styles.title}>{shapeCard.name}</div>
      </div>
      <div className={styles.options}>
        {renderTerrainOptions(shapeCard.terrains)}
        {renderShapeOptions(shapeCard.shapes, shapeCard.coinIndex)}
      </div>
    </div>
  );
}
