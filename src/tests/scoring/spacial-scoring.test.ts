import MapData from "../../classes/MapData";
import { TheCauldrons } from "../../models/ScoringCards";
import { Terrain } from "../../models/Terrains";

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