import type { Player } from "glicko2";

interface GlickoData {
  /** The accuracy of a performer's rating, where the lower the number, the higher the accuracy. */
  deviation: number;
  /** The performer's rating. */
  rating: number;
  /** The degree of expected fluctuation in a performer's rating, based on how
   * erratic the performer's performances are. */
  volatility: number;
}

declare interface GlickoPerformerData {
  /** The performer's glicko rating data before the start of the tournament. */
  glicko: GlickoData;
  /** The performer's Stash ID. */
  id: Performer["id"];
  /** The Stash ID of the performer image. 0 denotes the profile image is being
   * used. */
  imageID: Image["id"];
  /** The src for the performer image. */
  imageSrc: string;
  /** The performer's name. */
  name: Performer["name"];
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
