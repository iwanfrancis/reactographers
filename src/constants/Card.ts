import { Terrain } from "./Terrains";

export type Shape = number[][];
type ShapeRotations = Shape[];

export interface Card {
    name: string;
    time: number;
}

export interface ShapeCard extends Card {
    terrains: Terrain[];
    shapes: ShapeRotations[]
}

export function isCard(object: any): object is Card {
    return 'name' in object;
}

export function isShapeCard(object: any): object is ShapeCard {
    return 'name' in object;
}