import React from "react";
import classNames from "classnames";

import {
  Card,
  ShapeCard,
  isShapeCard,
  Shape,
  isRuinsCard,
  RuinsCard,
  isAmbushCard,
  AmbushCard,
} from "../../../models/Card";
import { Terrain } from "../../../game-components/Terrains";
import styles from "./CurrentCard.module.scss";
import CardShape from "../CardShape/CardShape";
import { ReactComponent as Ruin } from "../../../assets/sprites/ruin/ruin.svg";
import { ReactComponent as AmbushClockwise } from "../../../assets/sprites/ambush-clockwise/ambush-clockwise.svg";
import { ReactComponent as AmbushAntiClockwise } from "../../../assets/sprites/ambush-anti-clockwise/ambush-anti-clockwise.svg";
import { SoloAmbushDirection } from "../../../models/SoloAmbushDirection";
import SoloAmbushCorner from "./SoloAmbushCorner/SoloAmbushCorner";

export interface Props {
  card: Card;
  currentTerrain: Terrain | undefined;
  currentShape: Shape | undefined;
  possibleShapes: Shape[];
  ruinsActive: boolean;
  setCurrentTerrain: React.Dispatch<React.SetStateAction<Terrain | undefined>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<Shape | undefined>>;
  offset: number;
}

export default class CurrentCard extends React.PureComponent<Props> {
  renderTerrainOptions(terrains: Terrain[]) {
    const {
      ruinsActive,
      possibleShapes,
      currentTerrain,
      setCurrentTerrain = () => {},
    } = this.props;
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
  }

  renderShapeOptions(shapes: Shape[], coinIndex = -1) {
    const { possibleShapes, currentShape, setCurrentShape = () => {} } = this.props;
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
  }

  render() {
    const { card, offset } = this.props;

    const offsetStyle = {
      top: `${offset}px`,
    };

    if (isShapeCard(card)) {
      const shapeCard = card as ShapeCard;
      return (
        <div className={styles.card} style={offsetStyle}>
          <div className={styles.header}>{shapeCard.time}</div>
          <div className={styles.body}>
            <div className={styles.title}>{shapeCard.name}</div>
          </div>
          <div className={styles.options}>
            {this.renderTerrainOptions(shapeCard.terrains)}
            {this.renderShapeOptions(shapeCard.shapes, shapeCard.coinIndex)}
          </div>
        </div>
      );
    }

    if (isRuinsCard(card)) {
      const ruinsCard = card as RuinsCard;
      return (
        <div className={styles.card} style={offsetStyle}>
          <div className={styles.header}>
            <Ruin className={styles["ruins-header"]} />
          </div>
          <div className={styles.body}>
            <div className={styles.title}>{ruinsCard.name}</div>
          </div>
          <div className={styles.options}>
            <Ruin className={styles["ruins-large"]} />
          </div>
        </div>
      );
    }

    if (isAmbushCard(card)) {
      const ambushCard = card as AmbushCard;
      return (
        <div className={styles.card} style={offsetStyle}>
          <div className={styles.header}>
            <SoloAmbushCorner corner={ambushCard.soloAmbushCorner}></SoloAmbushCorner>
          </div>
          <div className={styles.body}>
            <div className={styles.title}>{ambushCard.name}</div>
          </div>
          <div className={styles.options}>
            <div className={styles["ambush-info"]}>
              <div className={styles["ambush-direction"]}>
                <div className={styles["ambush-direction-square"]}></div>
                {ambushCard.soloAmbushDirection === SoloAmbushDirection.Clockwise ? (
                  <AmbushClockwise className={styles["ambush-direction-svg"]}></AmbushClockwise>
                ) : (
                  <AmbushAntiClockwise
                    className={styles["ambush-direction-svg"]}
                  ></AmbushAntiClockwise>
                )}
              </div>
              <div className={styles.divider}></div>
              <div className={styles.shape}>
                <CardShape shape={ambushCard.shape} terrain={Terrain.Monster} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
