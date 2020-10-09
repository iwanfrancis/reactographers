import { Terrain } from "./Terrains";

type Shape = boolean[][][];

export interface ShapeCard {
    name: string;
    time: number;
    terrains: Terrain[];
    shapes: Shape[]
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