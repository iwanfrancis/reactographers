import { AmbushCard } from "../models/Card";
import { SoloAmbushCorner } from "../models/SoloAmbushCorner";
import { SoloAmbushDirection } from "../models/SoloAmbushDirection";

const KoboldOnslaught: AmbushCard = {
  name: "Kobold Onslaught",
  time: 0,
  soloAmbushCorner: SoloAmbushCorner.BottomLeft,
  soloAmbushDirection: SoloAmbushDirection.Clockwise,
  shape: [
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
};

const GoblinAttack: AmbushCard = {
  name: "Goblin Attack",
  time: 0,
  soloAmbushCorner: SoloAmbushCorner.BottomRight,
  soloAmbushDirection: SoloAmbushDirection.AntiClockwise,
  shape: [
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
};

const BugbearAssault: AmbushCard = {
  name: "Bugbear Assault",
  time: 0,
  soloAmbushCorner: SoloAmbushCorner.TopRight,
  soloAmbushDirection: SoloAmbushDirection.Clockwise,
  shape: [
    [
      [1, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
};

const GnollRaid: AmbushCard = {
  name: "Gnoll Raid",
  time: 0,
  soloAmbushCorner: SoloAmbushCorner.TopLeft,
  soloAmbushDirection: SoloAmbushDirection.AntiClockwise,
  shape: [
    [
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
};

const AmbushCards = [KoboldOnslaught, GoblinAttack, BugbearAssault, GnollRaid];

export default AmbushCards;
