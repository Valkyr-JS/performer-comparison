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
import { createMatchList } from "@/gameplay/glicko";

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

  const [performers, setPerformers] = useState<GlickoPerformerData[]>([]);
  const [matchList, setMatchList] = useState<[number, number][]>([]);

  // The current matchup index
  const [matchIndex, _setMatchIndex] = useState<number>(0);

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

      // Set the performer data
      setPerformers(formattedData);

      // Create the matchlist
      setMatchList(createMatchList(formattedData.length));
    }
  }, [loading]);

  if (loading || error || matchList.length === 0) return null;

  /* ------------------------------------- Handle image change ------------------------------------ */

  const handleImageChange = async (performerID: string, prevID: number) => {
    getPerformerImage({ variables: { performerID, prevID } }).then((res) => {
      const updatedPerformers = performers.map((p) => {
        const { id, paths } = (res.data.findImages.images as Image[])[0];
        return p.id === performerID
          ? { ...p, imageID: id, imageSrc: paths.thumbnail ?? "" }
          : p;
      });
      setPerformers(updatedPerformers);

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
        profiles={[
          performers[matchList[matchIndex][0]],
          performers[matchList[matchIndex][1]],
        ]}
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
