import MapData from "../classes/MapData";
import { MagesValley, SentinelWood, TheCauldrons, Wildholds } from "../models/ScoringCards";
import { Terrain } from "../models/Terrains";

describe('the cauldrons', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is full', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Farm,   Terrain.Monster],
          [Terrain.Water,   Terrain.Forest,  Terrain.Mountain],
          [Terrain.Water,   Terrain.Forest, Terrain.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(0);
    })

    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,   Terrain.Empty],
          [Terrain.Empty,   Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty,   Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(0);
    })

    test('when there are no single empty cells', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Empty,   Terrain.Farm],
          [Terrain.Water,   Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty,   Terrain.Empty, Terrain.Monster],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(0);
    })
  })
  describe('gives one reputation star', () => {
    test('when an empty space is surrounded by terrain', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Farm,   Terrain.Monster],
          [Terrain.Water,   Terrain.Empty,  Terrain.Mountain],
          [Terrain.Water,   Terrain.Forest, Terrain.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(1);
    })

    test('when an empty corner space is surrounded by terrain', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Farm,   Terrain.Monster],
          [Terrain.Water,   Terrain.Village,  Terrain.Mountain],
          [Terrain.Water,   Terrain.Forest, Terrain.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(1);
    })

    test('when an empty edge space is surrounded by terrain', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Farm,   Terrain.Monster],
          [Terrain.Empty,   Terrain.Village,  Terrain.Mountain],
          [Terrain.Water,   Terrain.Forest, Terrain.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(1);
    })
  })
  describe('gives four reputation stars', () => {
    test('when there are four cauldrons', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Farm,   Terrain.Empty],
          [Terrain.Water,   Terrain.Monster,  Terrain.Mountain],
          [Terrain.Empty,   Terrain.Forest, Terrain.Empty],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(4);
    })
  })
})

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

describe('sentinel wood', () => {
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

    test('when there are none forest spaces adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Farm,  Terrain.Village],
          [Terrain.Monster, Terrain.Empty, Terrain.Empty],
          [Terrain.Mountain, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(0);
    })

    test('when a forest space is not adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(0);
    })
  })
  describe('gives one reputation star', () => {
    test('when a forest space is adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Forest, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(1);
    })

    test('when a forest space is in the corner of the map', () => {
      const map = new MapData(
        [
          [Terrain.Forest, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(1);
    })
  })
  describe('gives two reputation stars', () => {
    test('when there are two forest spaces adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Forest, Terrain.Empty, Terrain.Forest],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(2);
    })
  })
})

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