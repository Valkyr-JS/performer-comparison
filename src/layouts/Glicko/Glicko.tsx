import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PERFORMER_IMAGE, GET_PERFORMERS } from "@/apollo/queries";
import OneVsOneBoard from "@/components/OneVsOneBoard/OneVsOneBoard";
import {
  GLICKO_DEVIATION_DEFAULT,
  GLICKO_RATING_DEFAULT,
  GLICKO_VOLATILITY_DEFAULT,
} from "@/constants";
import styles from "./Glicko.module.scss";
import { GlickoPerformerData, PerformerCustomFields } from "../../../types/app";

interface GlickoProps {
  /** The filters for fetching eligible performers for the tournament. */
  filter: {
    genders: GenderEnum[];
    limit: number;
  };
}

const Glicko: React.FC<GlickoProps> = (props) => {
  /* -------------------------------------------- Setup ------------------------------------------- */

  const { loading, error, data } = useQuery(GET_PERFORMERS, {
    variables: { ...props.filter },
  });

  const [getPerformerImage] = useLazyQuery(GET_PERFORMER_IMAGE);

  const [allPerformers, setAllPerformers] = useState<GlickoPerformerData[]>([]);

  // The current matchup data
  const [matchup, setMatchup] = useState<[number, number] | null>(null);

  // Once data is available, update the required data
  useEffect(() => {
    if (!loading && !error) {
      // First format the fetched data
      const formattedData = (data.findPerformers.performers as Performer[]).map(
        (p) => {
          const customFields = p.custom_fields as PerformerCustomFields;
          return {
            glicko: {
              deviation:
                customFields.glicko_deviation ?? GLICKO_DEVIATION_DEFAULT,
              rating: customFields.glicko_rating ?? GLICKO_RATING_DEFAULT,
              volatility:
                customFields.glicko_volatility ?? GLICKO_VOLATILITY_DEFAULT,
            },
            id: p.id,
            imageID: "0",
            imageSrc: p.image_path ?? "",
            name: p.name,
          };
        }
      );
      setAllPerformers(formattedData);

      // Now set the first matchup using the first two performer in the list.
      setMatchup([0, 1]);
    }
  }, [loading]);

  if (loading || error || matchup === null) return null;

  /* ------------------------------------- Handle image change ------------------------------------ */

  const handleImageChange = async (performerID: string, prevID: number) => {
    getPerformerImage({ variables: { performerID, prevID } }).then((res) => {
      const updatedPerformers = allPerformers.map((p) => {
        const { id, paths } = (res.data.findImages.images as Image[])[0];
        return p.id === performerID
          ? { ...p, imageID: id, imageSrc: paths.thumbnail ?? "" }
          : p;
      });
      setAllPerformers(updatedPerformers);

      // Referch to clear the cache
      res.refetch();
    });
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
        profiles={[allPerformers[matchup[0]], allPerformers[matchup[1]]]}
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
