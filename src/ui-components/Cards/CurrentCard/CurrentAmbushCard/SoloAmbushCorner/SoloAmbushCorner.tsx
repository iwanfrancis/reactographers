import React from "react";
import { SoloAmbushCorner as SoloAmbushCornerModel } from "../../../../../models/SoloAmbushCorner";
import styles from "./SoloAmbushCorner.module.scss";

export interface SoloAmbushCornerProps {
  corner: SoloAmbushCornerModel;
}

export default function SoloAmbushCorner(props: SoloAmbushCornerProps) {
  const corner = props.corner;

  return (
    <div className={styles.corner}>
      <div className={styles.row}>
        <div
          className={
            corner === SoloAmbushCornerModel.TopLeft
              ? styles["corner-square"]
              : styles["not-corner-square"]
          }
        ></div>
        <div
          className={
            corner === SoloAmbushCornerModel.TopRight
              ? styles["corner-square"]
              : styles["not-corner-square"]
          }
        ></div>
      </div>
      <div className={styles.row}>
        <div
          className={
            corner === SoloAmbushCornerModel.BottomLeft
              ? styles["corner-square"]
              : styles["not-corner-square"]
          }
        ></div>
        <div
          className={
            corner === SoloAmbushCornerModel.BottomRight
              ? styles["corner-square"]
              : styles["not-corner-square"]
          }
        ></div>
      </div>
    </div>
  );
}
