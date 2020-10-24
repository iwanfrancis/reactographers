import MapData from "../../classes/MapData";
import { SentinelWood, Wildholds } from "../../models/ScoringCards";
import { Terrain } from "../../models/Terrains";

describe('wildholds', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(0);
    })

    test('when there is a cluster of six water spaces', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Water,  Terrain.Empty],
          [Terrain.Water, Terrain.Water, Terrain.Empty],
          [Terrain.Water, Terrain.Water, Terrain.Empty],
        ]
      )
      const score = Wildholds.score(map);
      expect(score).toBe(0);
    })

    test('when there is a cluster of five village spaces', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty],
          [Terrain.Village, Terrain.Village, Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = Wildholds.score(map);
      expect(score).toBe(0);
    })

    test('when there are two village clusters less than six spaces', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Village],
          [Terrain.Village, Terrain.Empty, Terrain.Village],
        ]
      )
      const score = Wildholds.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives eight reputation stars', () => {
    test('when there is a cluster of six village spaces', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty],
          [Terrain.Village, Terrain.Village, Terrain.Empty],
          [Terrain.Village, Terrain.Village, Terrain.Empty],
        ]
      )
      const score = Wildholds.score(map);
      expect(score).toBe(8);
    })

    test('when there is a cluster of nine village spaces', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Village],
          [Terrain.Village, Terrain.Village, Terrain.Village],
          [Terrain.Village, Terrain.Village, Terrain.Village],
        ]
      )
      const score = Wildholds.score(map);
      expect(score).toBe(8);
    })
  })

  describe('gives sixteen reputation stars', () => {
    test('when there are two village clusters over six spaces', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty, Terrain.Village, Terrain.Village],
          [Terrain.Village, Terrain.Village, Terrain.Empty, Terrain.Village, Terrain.Village],
          [Terrain.Village, Terrain.Village, Terrain.Empty, Terrain.Village, Terrain.Village],
        ]
      )
      const score = Wildholds.score(map);
      expect(score).toBe(16);
    })
  })
})
