import { Glicko2 } from "glicko2";
import type { GlickoPerformerData, GlickoTournament } from "../../types/app";

/** Create players for a new tournament. Returns an object containing the
 * tournament players and completed matches (none on creation). */
export const createTournament = (
  performers: GlickoPerformerData[]
): GlickoTournament => {
  const tournament = new Glicko2();
  const players = performers.map((p) =>
    tournament.makePlayer(
      p.glicko.rating,
      p.glicko.deviation,
      p.glicko.volatility
    )
  );

  return {
    players,
    matches: [],
  };
};
