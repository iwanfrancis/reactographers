import MapData from "../../classes/MapData";
import { CanalLake, MagesValley, ShoresideExpanse } from "../../game-components/ScoringCards";
import { Terrain } from "../../game-components/Terrains";

describe('mages valley', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(0);
    })

    test('when none water/farm spaces are adjacent mountains', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Village,  Terrain.Empty],
          [Terrain.Monster, Terrain.Mountain, Terrain.Forest],
          [Terrain.Empty, Terrain.OutOfBounds, Terrain.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives one reputation star', () => {
    test('when there is a farm space adjacent to a mountain space', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Mountain, Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(1);
    })

    test('when there is a farm space adjacent to two mountain spaces', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Mountain, Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Mountain],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(1);
    })
  })

  describe('gives two reputation stars', () => {
    test('when there is a water space adjacent to a mountain space', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Water, Terrain.Mountain, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(2);
    })

    test('when there is a water space adjacent to a two mountain spaces', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Water, Terrain.Mountain, Terrain.Empty],
          [Terrain.Mountain, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(2);
    })

    test('when there are two farm spaces adjacent to a mountain space', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Farm, Terrain.Mountain, Terrain.Farm],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(2);
    })
  })
})

describe('canal lake', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })

    test('when there is a farm space adjacent to a none water space', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Village,  Terrain.Empty],
          [Terrain.Mountain, Terrain.Farm, Terrain.Monster],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })

    test('when there is a water space adjacent to a none farm space', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Village,  Terrain.Empty],
          [Terrain.Mountain, Terrain.Water, Terrain.Monster],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })

    test('when there is a none water/farm space adjacent to a none water/farm space', () => {
      const map = new MapData(
        [
          [Terrain.Forest, Terrain.Village,  Terrain.Mountain],
          [Terrain.Mountain, Terrain.Monster, Terrain.Forest],
          [Terrain.Village, Terrain.Forest, Terrain.Village],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives two reputation stars', () => {
    test('when there is a farm space adjacent to a water space', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Water, Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(2);
    })
  })

  describe('gives four reputation stars', () => {
    test('when there is a farm space adjacent to three water spaces', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Water,  Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Water],
          [Terrain.Empty, Terrain.Water, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(4);
    })

    test('when there is a water space adjacent to three farm spaces', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Farm,  Terrain.Empty],
          [Terrain.Empty, Terrain.Water, Terrain.Farm],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(4);
    })

    test('when there are are two sets of adjacent water and farm spaces', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Empty,  Terrain.Water],
          [Terrain.Farm, Terrain.Empty, Terrain.Farm],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(4);
    })
  })
})

describe('shoreside expanse', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })

    test('when there is a farm cluster adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Farm, Terrain.Empty],
          [Terrain.Farm, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })

    test('when there is a water cluster adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Empty],
          [Terrain.Water, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })

    test('when there is a water cluster adjacent to a farm cluster', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Farm],
          [Terrain.Water, Terrain.Farm],
          [Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives three reputation stars', () => {
    test('when there is a water cluster not adjacent to the edge of the map or a farm cluster', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Water, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(3);
    })

    test('when there is a farm cluster not adjacent to the edge of the map or a water cluster', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(3);
    })

    test('when there is a farm cluster by itself and a water cluster on the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Water],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(3);
    })
  })

  describe('gives six reputation stars', () => {
    test('when there are two farm clusters by themselves', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty, Terrain.Farm, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(6);
    })

    test('when there are two water clusters by themselves', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Water, Terrain.Empty, Terrain.Water, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(6);
    })

    test('when there is a water cluster and a farm cluster, both by themselves', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Water, Terrain.Empty, Terrain.Farm, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(6);
    })
  })
})