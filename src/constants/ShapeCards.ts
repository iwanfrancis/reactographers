import { Card, ShapeCard } from "./Card";
import { Terrain } from "./Terrains";

const FishingVillage: ShapeCard = {
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

const Marshlands: ShapeCard = {
    name: 'Marshlands',
    time: 2,
    terrains: [Terrain.Forest, Terrain.Water],
    shapes: [
        [
            [
                [0, 1, 0, 0],
                [0, 1, 1, 1],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 1],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const HinterlandStream: ShapeCard = {
    name: 'Hinterland Stream',
    time: 2,
    terrains: [Terrain.Farm, Terrain.Water],
    shapes: [
        [
            [
                [1, 1, 1, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const ShapeCards = [
    FishingVillage,
    Marshlands,
    HinterlandStream
]

export default ShapeCards;