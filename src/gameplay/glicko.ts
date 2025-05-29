import { shuffle } from "@/utils/math";

/** Create a randomised array of number pairs, where each pair represents the
 * 0-based index of two players. */
export const createMatchList = (numPlayers: number): [number, number][] => {
  const matchups: [number, number][] = [];
  for (let i = 0; i < numPlayers; i++) {
    for (let j = 1; j < numPlayers; j++) {
      // Check if the indices match, or the match is already listed in the
      // opposite order.
      const sameIndex = i === j;
      const alreadyExists = matchups.find((m) => `${m}` === `${[j, i]}`);
      if (!sameIndex && !alreadyExists) matchups.push([i, j]);
    }
  }

  // Randomise the matchups before returning
  return shuffle(matchups);
};
