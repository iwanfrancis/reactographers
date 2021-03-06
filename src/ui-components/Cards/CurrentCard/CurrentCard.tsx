import React from "react";

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
import { SquareType } from "../../../game-components/SquareType";
import CurrentAmbushCard from "./CurrentAmbushCard/CurrentAmbushCard";
import CurrentRuinsCard from "./CurrentRuinsCard/CurrentRuinsCard";
import CurrentShapeCard from "./CurrentShapeCard/CurrentShapeCard";

export interface Props {
  card: Card;
  currentTerrain: SquareType | undefined;
  currentShape: Shape | undefined;
  possibleShapes: Shape[];
  ruinsActive: boolean;
  setCurrentTerrain: React.Dispatch<React.SetStateAction<SquareType | undefined>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<Shape | undefined>>;
  offset: number;
}

export default class CurrentCard extends React.PureComponent<Props> {
  render() {
    const { card, offset } = this.props;

    const offsetStyle = {
      top: `${offset}px`,
    };

    if (isShapeCard(card)) {
      const shapeCard = card as ShapeCard;
      return (
        <CurrentShapeCard
          shapeCard={shapeCard}
          offsetStyle={offsetStyle}
          {...this.props}
        ></CurrentShapeCard>
      );
    }

    if (isRuinsCard(card)) {
      const ruinsCard = card as RuinsCard;
      return <CurrentRuinsCard ruinsCard={ruinsCard} offsetStyle={offsetStyle}></CurrentRuinsCard>;
    }

    if (isAmbushCard(card)) {
      const ambushCard = card as AmbushCard;
      return (
        <CurrentAmbushCard ambushCard={ambushCard} offsetStyle={offsetStyle}></CurrentAmbushCard>
      );
    }
  }
}
