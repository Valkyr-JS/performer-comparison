import React from "react";
import { useQuery } from "@apollo/client";
// import OneVsOneBoard from "@/components/OneVsOneBoard/OneVsOneBoard";
import { GET_PERFORMERS } from "../../apollo/queries";
import styles from "./Glicko.module.scss";

interface GlickoProps {
  /** The filters for fetching eligible performers for the tournament. */
  filter: {
    genders: (
      | "MALE"
      | "FEMALE"
      | "TRANSGENDER_MALE"
      | "TRANSGENDER_FEMALE"
      | "INTERSEX"
      | "NON_BINARY"
    )[];
    limit: number;
  };
}

const Glicko: React.FC<GlickoProps> = (props) => {
  const { loading, error, data } = useQuery(GET_PERFORMERS, {
    variables: { ...props.filter.genders },
  });

  if (loading || error) return null;
  console.log(data);

  const handlePause: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("handlePause");
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
      {/* <OneVsOneBoard
        clickPauseHandler={handlePause}
        clickSkipHandler={handleSkip}
        clickStopHandler={handleStop}
        clickUndoHandler={handleUndo}
      /> */}
    </main>
  );
};

export default Glicko;
