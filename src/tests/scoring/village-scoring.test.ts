import MapData from "../../classes/MapData";
import { GreatCity, GreengoldPlains, SentinelWood, ShieldGate, Wildholds } from "../../game-components/ScoringCards";
import { Terrain } from "../../game-components/Terrains";

describe('great city', () => {
  describe('gives no reputation stars', () => {
    test('when there are no village spaces', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = GreatCity.score(map);
      expect(score).toBe(0);
    })

    test('when the only village cluster is adjacent to a mountain', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Village, Terrain.Mountain, Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = GreatCity.score(map);
      expect(score).toBe(0);
    })

    test('when multiple village clusters are adjacent to mountains', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Village],
          [Terrain.Village, Terrain.Mountain, Terrain.Village],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = GreatCity.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives 1 reputation star per space in the cluster', () => {
    test('when the only village cluster is not adjacent to a mountain', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Village,  Terrain.Empty],
          [Terrain.Empty, Terrain.Village, Terrain.Empty],
          [Terrain.Empty, Terrain.Village, Terrain.Empty],
        ]
      )
      const score = GreatCity.score(map);
      expect(score).toBe(3);
    })

    test('when the largest village cluster is not adjacent to a mountain', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Empty,  Terrain.Empty],
          [Terrain.Village, Terrain.Empty, Terrain.Village],
          [Terrain.Village, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = GreatCity.score(map);
      expect(score).toBe(3);
    })

    test('when only the second largest village cluster is not adjacent to a mountain', () => {
      const map = new MapData(
        [
          [Terrain.Village, Terrain.Empty,  Terrain.Village],
          [Terrain.Village, Terrain.Empty, Terrain.Village],
          [Terrain.Village, Terrain.Mountain, Terrain.Empty],
        ]
      )
      const score = GreatCity.score(map);
      expect(score).toBe(2);
    })
  })
})

describe('greengold plains', () => {
  describe('gives no reputation stars', () => {
    test('when a village cluster has no adjacent terrain', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Empty, Terrain.Village, Terrain.Empty],
          [Terrain.Empty, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(0);
    })

    test('when a village cluster has one adjacent terrain type', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Forest,  Terrain.Empty],
          [Terrain.Forest, Terrain.Village, Terrain.Forest],
          [Terrain.Empty, Terrain.Forest, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(0);
    })

    test('when a village cluster has two adjacent terrain types', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Forest,  Terrain.Empty],
          [Terrain.Forest, Terrain.Village, Terrain.Farm],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(0);
    })

    test('when a village cluster has two adjacent terrain types and an empty adjacent square', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Empty,  Terrain.Empty],
          [Terrain.Forest, Terrain.Village, Terrain.Farm],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(0);
    })

    test('when a village cluster has two adjacent terrain types and is on the edge of the map', () => {
      const map = new MapData(
        [
          [Terrain.Forest, Terrain.Forest,  Terrain.Empty],
          [Terrain.Village, Terrain.Village, Terrain.Farm],
          [Terrain.Farm, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives three reputation stars', () => {
    test('when a village cluster has three adjacent terrain types', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Water,  Terrain.Empty],
          [Terrain.Forest, Terrain.Village, Terrain.Empty],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(3);
    })

    test('when a village cluster has four adjacent terrain types', () => {
      const map = new MapData(
        [
          [Terrain.Empty, Terrain.Water,  Terrain.Empty],
          [Terrain.Forest, Terrain.Village, Terrain.Monster],
          [Terrain.Empty, Terrain.Farm, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(3);
    })

    test('when one of two village clusters has three adjacent terrain types', () => {
      const map = new MapData(
        [
          [Terrain.Farm, Terrain.Empty,  Terrain.Empty],
          [Terrain.Village, Terrain.Water, Terrain.Village],
          [Terrain.Forest, Terrain.Empty, Terrain.Empty],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(3);
    })
  })

  describe('gives six reputation stars', () => {
    test('when a there are two village clusters with three adjacent terrain types', () => {
      const map = new MapData(
        [
          [Terrain.Farm, Terrain.Empty,  Terrain.Farm],
          [Terrain.Village, Terrain.Water, Terrain.Village],
          [Terrain.Forest, Terrain.Empty, Terrain.Forest],
        ]
      )
      const score = GreengoldPlains.score(map);
      expect(score).toBe(6);
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
