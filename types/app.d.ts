interface GlickoPerformerData {
  /** The performer's Stash ID. */
  id: Performer["id"];
  /** The src for the performer image. */
  imageSrc: string;
  /** The performer's name. */
  name: Performer["name"];
  /** The performer's rank before starting the tournament. */
  rank: number;
}

interface PerformerCustomFields {
  /** The accuracy of a performer's rating, where the lower the number, the higher the accuracy. */
  glicko_deviation?: number;
  /** The performer's rating. */
  glicko_rating?: number;
  /** The degree of expected fluctuation in a performer's rating, based on how
   * erratic the performer's performances are. */
  glicko_volatility?: number;
}
