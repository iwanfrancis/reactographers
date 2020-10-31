import { Terrain } from "../game-components/Terrains";

export type ShapeRotation = number[][];
export type Shape = ShapeRotation[];

export interface Card {
    name: string;
    time: number;
}

export interface RuinsCard extends Card {
    isRuin: boolean;
}

export interface ShapeCard extends Card {
    terrains: Terrain[];
    shapes: Shape[]
    coinIndex?: number // index of shape with coin (only ever one per card)
}

export function isCard(object: any): object is Card {
    return (
        'name' in object && typeof(object.name) == 'string' &&
        'time' in object && typeof(object.time) == 'number'
    );
}

export function isRuinsCard(object: any): object is RuinsCard {
    return (
        'name' in object && typeof(object.name) == 'string' &&
        'time' in object && typeof(object.time) == 'number' &&
        'isRuin' in object && typeof(object.isRuin) == 'boolean'
    );
}

export function isShapeCard(object: any): object is ShapeCard {
    return (
        'name' in object && typeof(object.name) == 'string' &&
        'time' in object && typeof(object.time) == 'number' &&
        'terrains' in object && 'shapes' in object
    );
}
