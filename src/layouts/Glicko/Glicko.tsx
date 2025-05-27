import React from "react";
// import OneVsOneBoard from "@/components/OneVsOneBoard/OneVsOneBoard";
import styles from "./Glicko.module.scss";

interface GlickoProps {
  /** The filters for fetching eligible performers for the tournament. */
  filter: {
    gender: {
      male: boolean;
      female: boolean;
      transMale: boolean;
      transFemale: boolean;
      intersex: boolean;
      nonBinary: boolean;
    };
  };
}

const Glicko: React.FC<GlickoProps> = (_props) => {
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
