import MapData from "../../classes/MapData";
import { CanalLake, MagesValley, ShoresideExpanse, TheGoldenGranary } from "../../game-components/ScoringCards";
import { SquareType } from "../../game-components/SquareType";

describe('mages valley', () => {
  describe('gives no reputation stars', () => {
    test('when the grid is empty', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = MagesValley.score(map,());
      expect(score).toBe(0);
    })

    test('when none water/farm spaces are adjacent mountains', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Village,  SquareType.Empty],
          [SquareType.Monster, SquareType.Mountain, SquareType.Forest],
          [SquareType.Empty, SquareType.OutOfBounds, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Mountain, SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(1);
    })

    test('when there is a farm space adjacent to two mountain spaces', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Mountain, SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Mountain],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Water, SquareType.Mountain, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(2);
    })

    test('when there is a water space adjacent to a two mountain spaces', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Water, SquareType.Mountain, SquareType.Empty],
          [SquareType.Mountain, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = MagesValley.score(map);
      expect(score).toBe(2);
    })

    test('when there are two farm spaces adjacent to a mountain space', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Farm, SquareType.Mountain, SquareType.Farm],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })

    test('when there is a farm space adjacent to a none water space', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Village,  SquareType.Empty],
          [SquareType.Mountain, SquareType.Farm, SquareType.Monster],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })

    test('when there is a water space adjacent to a none farm space', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Village,  SquareType.Empty],
          [SquareType.Mountain, SquareType.Water, SquareType.Monster],
          [SquareType.Empty, SquareType.Forest, SquareType.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(0);
    })

    test('when there is a none water/farm space adjacent to a none water/farm space', () => {
      const map = new MapData(
        [
          [SquareType.Forest, SquareType.Village,  SquareType.Mountain],
          [SquareType.Mountain, SquareType.Monster, SquareType.Forest],
          [SquareType.Village, SquareType.Forest, SquareType.Village],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Water,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Water],
          [SquareType.Empty, SquareType.Water, SquareType.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(4);
    })

    test('when there is a water space adjacent to three farm spaces', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Farm,  SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Farm],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
        ]
      )
      const score = CanalLake.score(map);
      expect(score).toBe(4);
    })

    test('when there are are two sets of adjacent water and farm spaces', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Empty,  SquareType.Water],
          [SquareType.Farm, SquareType.Empty, SquareType.Farm],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })

    test('when there is a farm cluster adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Farm, SquareType.Empty],
          [SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })

    test('when there is a water cluster adjacent to the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Empty],
          [SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(0);
    })

    test('when there is a water cluster adjacent to a farm cluster', () => {
      const map = new MapData(
        [
          [SquareType.Water, SquareType.Farm],
          [SquareType.Water, SquareType.Farm],
          [SquareType.Empty, SquareType.Empty],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(3);
    })

    test('when there is a farm cluster not adjacent to the edge of the map or a water cluster', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(3);
    })

    test('when there is a farm cluster by itself and a water cluster on the edge of the map', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Water],
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
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(6);
    })

    test('when there are two water clusters by themselves', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty, SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(6);
    })

    test('when there is a water cluster and a farm cluster, both by themselves', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty, SquareType.Empty, SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ]
      )
      const score = ShoresideExpanse.score(map);
      expect(score).toBe(6);
    })
  })
})

describe('the golden granary', () => {
  describe('gives no reputation stars', () => {
    test('when a water space is not adjacent to a ruin', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 0, col: 0}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(0);
    })

    test('when a farm space is not on a ruin', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 0, col: 0}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(0);
    })

    test('when a water space is on a ruin', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 1, col: 1}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(0);
    })

    test('when a farm space is adjacent to a ruin', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 1, col: 0}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(0);
    })
  })

  describe('gives one reputation star', () => {
    test('when a water space is adjacent to a ruin', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Water, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 0, col: 1}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(1);
    })
  })

  describe('gives three reputation stars', () => {
    test('when a farm space is on a ruin', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Empty],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 1, col: 1}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(3);
    })
  })

  describe('gives four reputation stars', () => {
    test('when a farm space is on a ruin and a water space is adjacent', () => {
      const map = new MapData(
        [
          [SquareType.Empty, SquareType.Empty,  SquareType.Empty],
          [SquareType.Empty, SquareType.Farm, SquareType.Water],
          [SquareType.Empty, SquareType.Empty, SquareType.Empty],
        ],
        [{row: 1, col: 1}]
      )
      const score = TheGoldenGranary.score(map);
      expect(score).toBe(4);
    })
  })
})