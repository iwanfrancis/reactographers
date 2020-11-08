import { Edict } from "../game-components/Edict";
import { Season } from "../game-components/Seasons";
import { SquareType } from "../game-components/SquareType";
import GridPosition from "../models/GridPosition";
import MapData from "./MapData";

export interface SeasonScore {
  season: Season;
  edictOne: Edict;
  edictOneScore: number | undefined;
  edictTwo: Edict;
  edictTwoScore: number | undefined;
  coinScore: number | undefined;
  monsterScore: number | undefined;
  totalScore: number | undefined;
}

export default class Score {
  seasonScores: SeasonScore[];
  gameFinished: boolean = false;

  constructor(seasons: Season[], edicts: Edict[]) {
    seasons.forEach((season) => {
      if (season.edicts.length !== 2) {
        throw new Error("Each season must have 2 edicts");
      }
    });

    if (edicts.length < 2) {
      throw new Error("Must have at least two edicts");
    }

    this.seasonScores = seasons.map((season) => {
      return {
        season: season,
        edictOne: edicts.find((edict) => edict.code === season.edicts[0]) || edicts[0],
        edictOneScore: undefined,
        edictTwo: edicts.find((edict) => edict.code === season.edicts[1]) || edicts[1],
        edictTwoScore: undefined,
        coinScore: undefined,
        monsterScore: undefined,
        totalScore: undefined,
      };
    });
  }

  public async scoreSeason(
    mapData: MapData,
    season: Season,
    coins: number,
    setScore: React.Dispatch<React.SetStateAction<Score>>,
    setOverlay: React.Dispatch<React.SetStateAction<MapData>>
  ) {
    let seasonScore = this.seasonScores.find((seasonScore) => seasonScore.season === season);

    if (!seasonScore) {
      throw new Error("Couldn\t find season score for that season");
    }

    seasonScore.edictOneScore = await seasonScore.edictOne.scoringCard.score(mapData, setOverlay);
    setScore(this);

    seasonScore.edictTwoScore = await seasonScore.edictTwo.scoringCard.score(mapData, setOverlay);
    setScore(this);

    seasonScore.coinScore = coins;
    setScore(this);

    let monsterScore = 0;
    mapData.scoreSquares((gridPos: GridPosition) => {
      if (gridPos.terrain === SquareType.Empty) {
        const adjacentSquares = mapData.getAdjacentSquares(gridPos);
        if (
          Object.values(adjacentSquares).some((square) => square.terrain === SquareType.Monster)
        ) {
          monsterScore--;
        }
      }
    });
    seasonScore.monsterScore = monsterScore;
    setScore(this);
    await new Promise((r) => setTimeout(r, 1000));

    seasonScore.totalScore =
      seasonScore.edictOneScore +
      seasonScore.edictTwoScore +
      seasonScore.coinScore +
      seasonScore.monsterScore;
    setScore(this);
    return seasonScore;
  }

  public getSeasonScore(season: Season) {
    const seasonScore = this.seasonScores.find((seasonScore) => seasonScore.season === season);

    if (!seasonScore) {
      throw new Error("Couldn\t find season score for that season");
    }

    return seasonScore.totalScore;
  }

  public getFinalScore() {
    if (!this.gameFinished) {
      return undefined;
    } else {
      return Object.values(this.seasonScores).reduce((acc, seasonScore) => {
        const score = seasonScore.totalScore;
        if (score) {
          return acc + score;
        } else {
          return acc + 0;
        }
      }, 0);
    }
  }
}
