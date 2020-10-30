import MapData from "../../classes/MapData";
import { Greenbough, MagesValley, SentinelWood, StonesideForest, TheCauldrons, Treetower, Wildholds } from "../../game-components/ScoringCards";
import { Terrain } from "../../game-components/Terrains";

describe('greenbough', () => {
  describe('gives no reputation stars', () => {
    test('when there are no forests in any row or column', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(0);
    })

    test('when there are none forest spaces in any row or column', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Monster,  Terrain.Empty],
          [Terrain.Farm, Terrain.Mountain, Terrain.Empty],
          [Terrain.Water, Terrain.Empty, Terrain.Empty],
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
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
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
          [Terrain.Empty, Terrain.Forest,  Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
        ]
      )
      const score = Greenbough.score(map);
      expect(score).toBe(4);
    })

    test('when there are 3 forest spaces in one row', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Forest, Terrain.Forest, Terrain.Forest],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
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

describe('stoneside forest', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(0);
    })

    test('when two mountains are connected by none forest spaces', () => {
      const map = new MapData(
        [
          [Terrain.Mountain, Terrain.Village,  Terrain.Empty],
          [Terrain.Empty, Terrain.Village, Terrain.Empty],
          [Terrain.Empty, Terrain.Village, Terrain.Mountain],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(0);
    })

    test('when two mountains have adjacent (none cluster) forests', () => {
      const map = new MapData(
        [
          [Terrain.Mountain, Terrain.Forest,  Terrain.Empty],
          [Terrain.Forest, Terrain.Empty, Terrain.Forest],
          [Terrain.Empty, Terrain.Forest, Terrain.Mountain],
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
          [Terrain.Mountain, Terrain.Forest,  Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Mountain],
        ]
      )
      const score = StonesideForest.score(map);
      expect(score).toBe(6);
    })

    test('when two mountains are connected by a cluster of forests and a third mountain is not connected', () => {
      const map = new MapData(
        [
          [Terrain.Mountain, Terrain.Forest,  Terrain.Empty, Terrain.Mountain],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Mountain, Terrain.Empty],
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
          [Terrain.Mountain, Terrain.Forest,  Terrain.Forest, Terrain.Mountain],
          [Terrain.Empty, Terrain.Forest, Terrain.Forest, Terrain.Empty],
          [Terrain.Empty, Terrain.Forest, Terrain.Mountain, Terrain.Empty],
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
          [Terrain.Mountain, Terrain.Forest,  Terrain.Empty, Terrain.Mountain],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty, Terrain.Forest],
          [Terrain.Empty, Terrain.Forest, Terrain.Mountain, Terrain.Forest],
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
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(0);
    })

    test('when no forest spaces are fully surrounded by filled spaces / the edge of map', () => {
      const map = new MapData(
        [
          [Terrain.Forest, Terrain.Empty,  Terrain.Forest],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
          [Terrain.Forest, Terrain.Empty, Terrain.Forest],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(0);
    })

    test('when a none forest space is surrounded by filled spaces / the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Water, Terrain.Monster,  Terrain.Mountain],
          [Terrain.Village, Terrain.Farm, Terrain.Monster],
          [Terrain.Water, Terrain.Village, Terrain.Farm],
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
          [Terrain.Empty, Terrain.Mountain,  Terrain.Empty],
          [Terrain.Water, Terrain.Forest, Terrain.Farm],
          [Terrain.Empty, Terrain.Monster, Terrain.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(1);
    })

    test('when a forest space on the edge of the map is surrounded by filled spaces', () => {
      const map = new MapData(
        [
          [Terrain.Mountain, Terrain.Empty,  Terrain.Empty],
          [Terrain.Forest, Terrain.Water, Terrain.Empty],
          [Terrain.Farm, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(1);
    })

    test('when a forest space in the corner of the map is surrounded by filled spaces', () => {
      const map = new MapData(
        [
          [Terrain.Forest, Terrain.Farm,  Terrain.Empty],
          [Terrain.Mountain, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
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
          [Terrain.Forest, Terrain.Mountain,  Terrain.Empty],
          [Terrain.Water, Terrain.Forest, Terrain.Farm],
          [Terrain.Empty, Terrain.Monster, Terrain.Empty],
        ]
      )
      const score = Treetower.score(map);
      expect(score).toBe(2);
    })

  })
})