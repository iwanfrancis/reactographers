import { Terrain } from "./Terrains";

export interface Map {
    grid: Terrain[][]
}

export const MapSize = {
    rows: 11,
    cols: 11
}

export const NormalMap = {
    grid: [
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Mountain, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Mountain, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Mountain, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Mountain, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Mountain, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty]
    ]
}