import MapData from "../../classes/MapData";
import { Borderlands, LostBarony, TheBrokenRoad, TheCauldrons } from "../../game-components/ScoringCards";
import { SquareType } from "../../game-components/SquareType";

describe('borderlands', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(0);
    })

    test('when there are no complete rows or columns', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Forest,   SquareType.Empty],
          [SquareType.Farm,   SquareType.Village,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Monster],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives six reputation stars', () => {
    test('when there is one complete row', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Village,   SquareType.Farm],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(6);
    })
  })

  describe('gives six reputation stars', () => {
    test('when there is one complete column', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Empty,   SquareType.Empty],
          [SquareType.Village,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Farm,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(6);
    })
  })

  describe('gives twelve reputation stars', () => {
    test('when there are two complete rows', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Village,   SquareType.Farm],
          [SquareType.Water,   SquareType.Village,  SquareType.Farm],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(12);
    })

    test('when there are two complete columns', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Water,   SquareType.Empty],
          [SquareType.Village,   SquareType.Village,  SquareType.Empty],
          [SquareType.Farm,   SquareType.Farm, SquareType.Empty],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(12);
    })

    test('when there is one complete row and one complete column', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Water,   SquareType.Farm],
          [SquareType.Village, SquareType.Empty,  SquareType.Empty],
          [SquareType.Farm,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Borderlands.score(map);
      expect(score).toBe(12);
    })
  })
})

describe('lost barony', () => {
  describe('gives no reputation stars', () => {
    test('when there are no complete filled squares', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = LostBarony.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives three reputation stars', () => {
    test('when the biggest square is only one wide', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Water,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = LostBarony.score(map);
      expect(score).toBe(3);
    })

    test('when there are two one wide squares', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Water,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = LostBarony.score(map);
      expect(score).toBe(3);
    })
  })

  describe('gives six reputation stars', () => {
    test('when the biggest square is two wide', () => {
      const map = new MapData(
        [
          [SquareType.Farm, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Water,  SquareType.Village],
          [SquareType.Empty,   SquareType.Water, SquareType.Monster],
        ]
      )
      const score = LostBarony.score(map);
      expect(score).toBe(6);
    })

    test('when a two wide square has extra attached terrains', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Farm],
          [SquareType.Empty,   SquareType.Water,  SquareType.Village],
          [SquareType.Farm,   SquareType.Water, SquareType.Monster],
        ]
      )
      const score = LostBarony.score(map);
      expect(score).toBe(6);
    })
  })

  describe('gives nine reputation stars', () => {
    test('when the biggest square is three wide', () => {
      const map = new MapData(
        [
          [SquareType.Farm, SquareType.Mountain,   SquareType.Water],
          [SquareType.Village,   SquareType.Water,  SquareType.Village],
          [SquareType.Monster,   SquareType.Water, SquareType.Monster],
        ]
      )
      const score = LostBarony.score(map);
      expect(score).toBe(9);
    })
  })
})

describe('the broken road', () => {
  describe('gives no reputation stars', () => {
    test('when there are no complete diagonal lines', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Empty,   SquareType.Empty],
          [SquareType.Monster,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Farm],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(0);
    })

    test('when there is a complete diagonal line which doesnt touch the left edge and bottom edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Village,   SquareType.Water],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Farm],
          [SquareType.Empty,   SquareType.Empty, SquareType.Farm],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(0);
    })

    test('when there is a complete diagonal line which touches the top and bottom of the map', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Village,   SquareType.Empty, SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Village, SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Farm, SquareType.Farm],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(0);
    })

    test('when there is a complete diagonal line which touches the right and bottom of the map', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Water],
          [SquareType.Empty,   SquareType.Village, SquareType.Empty],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives three reputation stars', () => {
    test('when there are is a complete diagonal line touching the left and bottom of the map', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Farm,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Farm],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(3);
    })

    test('when the bottom left corner is filled', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Farm,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(3);
    })
  })

  describe('gives six reputation stars', () => {
    test('when there are two complete diagonal lines touching the left and bottom of the map', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Empty,   SquareType.Empty],
          [SquareType.Monster,   SquareType.Farm,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Village, SquareType.Farm],
        ]
      )
      const score = TheBrokenRoad.score(map);
      expect(score).toBe(6);
    })
  })
})

describe('the cauldrons', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is full', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Farm,   SquareType.Monster],
          [SquareType.Water,   SquareType.Forest,  SquareType.Mountain],
          [SquareType.Water,   SquareType.Forest, SquareType.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(0);
    })

    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,   SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(0);
    })

    test('when there are no single empty cells', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Empty,   SquareType.Farm],
          [SquareType.Water,   SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty,   SquareType.Empty, SquareType.Monster],
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
          [SquareType.Village, SquareType.Farm,   SquareType.Monster],
          [SquareType.Water,   SquareType.Empty,  SquareType.Mountain],
          [SquareType.Water,   SquareType.Forest, SquareType.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(1);
    })

    test('when an empty corner space is surrounded by terrain', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Farm,   SquareType.Monster],
          [SquareType.Water,   SquareType.Village,  SquareType.Mountain],
          [SquareType.Water,   SquareType.Forest, SquareType.Forest],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(1);
    })

    test('when an empty edge space is surrounded by terrain', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Farm,   SquareType.Monster],
          [SquareType.Empty,   SquareType.Village,  SquareType.Mountain],
          [SquareType.Water,   SquareType.Forest, SquareType.Forest],
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
          [SquareType.Empty, SquareType.Farm,   SquareType.Empty],
          [SquareType.Water,   SquareType.Monster,  SquareType.Mountain],
          [SquareType.Empty,   SquareType.Forest, SquareType.Empty],
        ]
      )
      const score = TheCauldrons.score(map);
      expect(score).toBe(4);
    })
  })
})