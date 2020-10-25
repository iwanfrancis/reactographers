import { Terrain } from "../game-components/Terrains";

export type ShapeRotation = number[][];
export type Shape = ShapeRotation[];

export interface Card {
    name: string;
    time: number;
}

export interface ShapeCard extends Card {
    terrains: Terrain[];
    shapes: Shape[]
    coinIndex?: number // index of shape with coin (only ever one per card)
}

export function isCard(object: any): object is Card {
    return 'name' in object;
}

export function isShapeCard(object: any): object is ShapeCard {
    return 'name' in object;
}