import type { Player } from "glicko2";

declare type GlickoMatchResult = [Player, Player, 0 | 0.5 | 1];

declare interface GlickoPerformerData {
  /** The performer's Stash ID. */
  id: Performer["id"];
  /** The Stash ID of the performer image. 0 denotes the profile image is being
   * used. */
  imageID: Image["id"];
  /** The src for the performer image. */
  imageSrc: string;
  /** The performer's name. */
  name: Performer["name"];
  /** The Glicko player data */
  player: Player;
}

declare interface GlickoTournament {
  matches: [];
  players: Player[];
}

declare interface PerformerCustomFields {
  /** The accuracy of a performer's rating, where the lower the number, the higher the accuracy. */
  glicko_deviation: Glicko["deviation"];
  /** The performer's rating. */
  glicko_rating: Glicko["rating"];
  /** The degree of expected fluctuation in a performer's rating, based on how
   * erratic the performer's performances are. */
  glicko_volatility: Glicko["volatility"];
}
