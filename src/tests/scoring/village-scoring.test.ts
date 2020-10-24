import MapData from "../../classes/MapData";
import { SentinelWood, ShieldGate, Wildholds } from "../../models/ScoringCards";
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

describe('shieldgate', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(0);
    })

    test('when there are two none village clusters', () => {
      const map = new MapData(
        [
          [Terrain.Farm, Terrain.Farm,  Terrain.Empty],
          [Terrain.Farm, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Farm],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(0);
    })

    test('when there is only one cluster of villages', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives two reputation stars', () => {
    test('when the second biggest village cluster has one space', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Village],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(2);
    })

    test('when the second and third biggest village clusters both have one space', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Empty,  Terrain.Village],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Village],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(2);
    })
  })

  describe('gives four reputation stars', () => {
    test('when the second biggest village cluster has two spaces', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Village,  Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Village, Terrain.Village],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(4);
    })

    test('when the second biggest village cluster has two spaces and the third biggest has one space', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Empty,  Terrain.Village],
          [Terrain.Village, Terrain.Empty, Terrain.Village],
          [Terrain.Empty, Terrain.Village, Terrain.Empty],
        ]
      )
      const score = ShieldGate.score(map);
      expect(score).toBe(4);
    })
  })
})
