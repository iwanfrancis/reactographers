import MapData from "../../classes/MapData";
import { MagesValley } from "../../models/ScoringCards";
import { Terrain } from "../../models/Terrains";

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