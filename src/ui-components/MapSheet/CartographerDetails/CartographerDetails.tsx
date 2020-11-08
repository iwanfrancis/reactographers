import React from "react";
import { Cartographer } from "../../../models/Cartographer";
import styles from "./CartographerDetails.module.scss";

export default function CartographerDetails(props: Cartographer) {
  return (
    <div className={styles["cartographer-details"]}>
      <div className={styles["name-and-title"]}>
        Cartographer:
        <div className={styles.name}>{props.name}</div>
        Title:
        <div className={styles.title}>{props.title}</div>
      </div>
    </div>
  );
}
