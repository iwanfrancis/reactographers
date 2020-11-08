import { RuinsCard, ShapeCard } from "../models/Card";
import { SquareType } from "./SquareType";

// RUINS CARDS
const OutpostRuins: RuinsCard = {
    name: 'Outpost Ruins',
    time: 0,
    isRuin: true
}

const TempleRuins: RuinsCard = {
    name: 'Temple Ruins',
    time: 0,
    isRuin: true
}

// TERRAIN CARDS
const Farmland: ShapeCard = {
    name: 'Farmland',
    time: 1,
    terrains: [SquareType.Farm],
    coinIndex: 0,
    shapes: [
        [
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
            
        ],
        [
            [
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const FishingVillage: ShapeCard = {
    name: 'Fishing Village',
    time: 2,
    terrains: [SquareType.Village, SquareType.Water],
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
            ]
        ]
    ]
}

const ForgottenForest: ShapeCard = {
    name: 'Forgotten Forest',
    time: 1,
    terrains: [SquareType.Forest],
    coinIndex: 0,
    shapes: [
        [
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        ],
        [
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const GreatRiver: ShapeCard = {
    name: 'Great River',
    time: 1,
    terrains: [SquareType.Water],
    coinIndex: 0,
    shapes: [
        [
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        ],
        [
            [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const Hamlet: ShapeCard = {
    name: 'Hamlet',
    time: 1,
    terrains: [SquareType.Village],
    coinIndex: 0,
    shapes: [
        [
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        ],
        [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}



const HinterlandStream: ShapeCard = {
    name: 'Hinterland Stream',
    time: 2,
    terrains: [SquareType.Farm, SquareType.Water],
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

const Homestead: ShapeCard = {
    name: 'Homestead',
    time: 2,
    terrains: [SquareType.Village, SquareType.Farm],
    shapes: [
        [
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const Marshlands: ShapeCard = {
    name: 'Marshlands',
    time: 2,
    terrains: [SquareType.Forest, SquareType.Water],
    shapes: [
        [
            [
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const Orchard: ShapeCard = {
    name: 'Orchard',
    time: 2,
    terrains: [SquareType.Forest, SquareType.Farm],
    shapes: [
        [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const RiftLands: ShapeCard = {
    name: 'Rift Lands',
    time: 0,
    terrains: [SquareType.Forest, SquareType.Village, SquareType.Farm, SquareType.Water, SquareType.Monster],
    shapes: [
        [
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        ]
    ]
}

const TreetopVillage: ShapeCard = {
    name: 'Treetop Village',
    time: 2,
    terrains: [SquareType.Forest, SquareType.Village],
    shapes: [
        [
            [
                [0, 0, 1, 1],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
            ],
            [
                [0, 1, 1, 1],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ]
        ]
    ]
}


const ExploreCards = [
    Farmland,
    FishingVillage,
    ForgottenForest,
    GreatRiver,
    Hamlet,
    HinterlandStream,
    Homestead,
    Marshlands,
    Orchard,
    OutpostRuins,
    RiftLands,
    TempleRuins,
    TreetopVillage,
]

export default ExploreCards;