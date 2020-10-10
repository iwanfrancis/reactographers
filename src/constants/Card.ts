import { Terrain } from "./Terrains";

export type ShapeRotation = number[][];
export type Shape = ShapeRotation[];

export interface Card {
    name: string;
    time: number;
}

export interface ShapeCard extends Card {
    terrains: Terrain[];
    shapes: Shape[]
}

export function isCard(object: any): object is Card {
    return 'name' in object;
}

export function isShapeCard(object: any): object is ShapeCard {
    return 'name' in object;
}