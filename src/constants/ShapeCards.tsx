import { Terrain } from "./Terrains";

export type Shape = number[][];
type ShapeRotations = Shape[];

export interface ShapeCard {
    name: string;
    time: number;
    terrains: Terrain[];
    shapes: ShapeRotations[]
}

export const FishingVillage = {
    name: 'Fishing Village',
    time: 2,
    terrains: [Terrain.Village, Terrain.Water],
    shapes: [
        [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ]
        ]
    ]
}