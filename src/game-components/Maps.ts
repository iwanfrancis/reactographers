import GridPosition from "../models/GridPosition";
import { SquareType } from "./Terrains";

export interface Map {
    grid: SquareType[][];
    ruins: GridPosition[];
    rows: number;
    cols: number
}

export const DefaultMapSize = {
    rows: 11,
    cols: 11
}

export const NormalMap = {
    grid: [
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Mountain, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Mountain, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Mountain, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Mountain, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Mountain, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty]
    ],
    ruins: [
        {row: 1, col: 5},
        {row: 2, col: 1},
        {row: 2, col: 9},
        {row: 8, col: 1},
        {row: 8, col: 9},
        {row: 9, col: 5},
    ],
    rows: 11,
    cols: 11
}