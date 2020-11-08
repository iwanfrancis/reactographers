import MapData from "../../classes/MapData";
import { Greenbough, MagesValley, SentinelWood, StonesideForest, TheCauldrons, Treetower, Wildholds } from "../../game-components/ScoringCards";
import { SquareType } from "../../game-components/SquareType";

describe('greenbough', () => {
  describe('gives no reputation stars', () => {
    test('when there are no forests in any row or column', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(0);
    })

    test('when there are none forest spaces in any row or column', () => {
      const map = new MapData(
        [
          [SquareType.Village, SquareType.Monster,  SquareType.Empty],
          [SquareType.Farm, SquareType.Mountain, SquareType.Empty],
          [SquareType.Water, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(0);
    })
  })

  describe('2 reputation stars', () => {
    test('when there is a forest space in a column and a row', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(2);
    })
  })

  describe('4 reputation stars', () => {
    test('when there are 3 forest spaces in one column', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Forest,  SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(4);
    })

    test('when there are 3 forest spaces in one row', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Forest, SquareType.Forest, SquareType.Forest],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(4);
    })
  })
})

describe('sentinel wood', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(0);
    })

    test('when there are none forest spaces adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Farm,  SquareType.Village],
          [SquareType.Monster, SquareType.Empty, SquareType.Empty],
          [SquareType.Mountain, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(0);
    })

    test('when a forest space is not adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Forest, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(1);
    })

    test('when a forest space is in the corner of the map', () => {
      const map = new MapData(
        [
          [SquareType.Forest, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Forest, SquareType.Empty, SquareType.Forest],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = SentinelWood.score(map);
      expect(score).toBe(2);
    })
  })
})

describe('stoneside forest', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(0);
    })

    test('when two mountains are connected by none forest spaces', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Village,  SquareType.Empty],
          [SquareType.Empty, SquareType.Village, SquareType.Empty],
          [SquareType.Empty, SquareType.Village, SquareType.Mountain],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(0);
    })

    test('when two mountains have adjacent (none cluster) forests', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Forest,  SquareType.Empty],
          [SquareType.Forest, SquareType.Empty, SquareType.Forest],
          [SquareType.Empty, SquareType.Forest, SquareType.Mountain],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives six reputation stars', () => {
    test('when two mountains are connected by a cluster of forests', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Forest,  SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Mountain],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(6);
    })

    test('when two mountains are connected by a cluster of forests and a third mountain is not connected', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Forest,  SquareType.Empty, SquareType.Mountain],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Mountain, SquareType.Empty],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(6);
    })
  })

  describe('gives nine reputation stars', () => {
    test('when three mountains are connected by a single cluster of forests', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Forest,  SquareType.Forest, SquareType.Mountain],
          [SquareType.Empty, SquareType.Forest, SquareType.Forest, SquareType.Empty],
          [SquareType.Empty, SquareType.Forest, SquareType.Mountain, SquareType.Empty],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(9);
    })
  })

  describe('gives nine reputation stars', () => {
    test('when three mountains are connected by a two different clusters of forests', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Forest,  SquareType.Empty, SquareType.Mountain],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty, SquareType.Forest],
          [SquareType.Empty, SquareType.Forest, SquareType.Mountain, SquareType.Forest],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(9);
    })
  })
})


describe('treetower', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(0);
    })

    test('when no forest spaces are fully surrounded by filled spaces / the edge of map', () => {
      const map = new MapData(
        [
          [SquareType.Forest, SquareType.Empty,  SquareType.Forest],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
          [SquareType.Forest, SquareType.Empty, SquareType.Forest],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(0);
    })

    test('when a none forest space is surrounded by filled spaces / the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Monster,  SquareType.Mountain],
          [SquareType.Village, SquareType.Farm, SquareType.Monster],
          [SquareType.Water, SquareType.Village, SquareType.Farm],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives one reputation star', () => {
    test('when a forest space is surrounded by filled spaces', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Mountain,  SquareType.Empty],
          [SquareType.Water, SquareType.Forest, SquareType.Farm],
          [SquareType.Empty, SquareType.Monster, SquareType.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(1);
    })

    test('when a forest space on the edge of the map is surrounded by filled spaces', () => {
      const map = new MapData(
        [
          [SquareType.Mountain, SquareType.Empty,  SquareType.Empty],
          [SquareType.Forest, SquareType.Water, SquareType.Empty],
          [SquareType.Farm, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(1);
    })

    test('when a forest space in the corner of the map is surrounded by filled spaces', () => {
      const map = new MapData(
        [
          [SquareType.Forest, SquareType.Farm,  SquareType.Empty],
          [SquareType.Mountain, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(1);
    })

  })

  describe('gives two reputation stars', () => {
    test('when two forest spaces are surrounded by filled spaces / the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Forest, SquareType.Mountain,  SquareType.Empty],
          [SquareType.Water, SquareType.Forest, SquareType.Farm],
          [SquareType.Empty, SquareType.Monster, SquareType.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(2);
    })

  })
})