import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import OneVsOneBoard from "../../components/OneVsOneBoard/OneVsOneBoard";
import { GET_PERFORMERS } from "../../apollo/queries";
import styles from "./Glicko.module.scss";

interface GlickoProps {
  /** The filters for fetching eligible performers for the tournament. */
  filter: {
    genders: GenderEnum[];
    limit: number;
  };
}

const Glicko: React.FC<GlickoProps> = (props) => {
  const { loading, error, data } = useQuery(GET_PERFORMERS, {
    variables: { ...props.filter },
  });

  // The current matchup data
  const [matchup, setMatchup] = useState<
    [GlickoPerformerData, GlickoPerformerData] | null
  >(null);

  // Update the matchup data with the first two performers as soon as it's
  // loaded.
  useEffect(() => {
    if (!loading && !error) setMatchup([performers[0], performers[1]]);
  }, [loading]);

  if (loading || error) return null;

  // Format fetched data
  const performers: GlickoPerformerData[] = data.findPerformers.performers.map(
    (p: Performer) => {
      return {
        id: p.id,
        imageSrc: p.image_path ?? "",
        name: p.name,
        rank: (p.custom_fields as PerformerCustomFields).glicko_rating,
      };
    }
  );

  if (matchup === null) return null;

  const handleImageChange: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handleImageChange");
  };
  const handlePause: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handlePause");
  };
  const handleSelect: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handleSelect");
  };
  const handleSkip: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handleSkip");
  };
  const handleStop: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handleStop");
  };
  const handleUndo: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handleUndo");
  };

  return (
    <main className={styles.glicko}>
      <OneVsOneBoard
        profiles={matchup}
        changeImageHandler={handleImageChange}
        clickSelectHandler={handleSelect}
        clickPauseHandler={handlePause}
        clickSkipHandler={handleSkip}
        clickStopHandler={handleStop}
        clickUndoHandler={handleUndo}
      />
    </main>
  );
};

export default Glicko;
