import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PERFORMER_IMAGE, GET_PERFORMERS } from "@/apollo/queries";
import OneVsOneBoard from "@/components/OneVsOneBoard/OneVsOneBoard";
import {
  GLICKO_DEVIATION_DEFAULT,
  GLICKO_RATING_DEFAULT,
  GLICKO_VOLATILITY_DEFAULT,
} from "@/constants";
import * as styles from "./Glicko.module.scss";
import {
  GlickoMatchResult,
  GlickoPerformerData,
  PerformerCustomFields,
} from "../../../types/app";
import { createMatchList } from "@/gameplay/glicko";
import { Glicko2 } from "glicko2";
import ProgressBoard from "@/components/ProgressBoard/ProgressBoard";
import Modal from "@/components/Modal/Modal";

interface GlickoProps {
  /** Function to execute when the user abandons the tournament without saving
   * their progress. */
  abandonTournamentHandler: () => void;
  /** Function to execute when the user completes the tournament. */
  endTournamentHandler: () => void;
  /** The filters for fetching eligible performers for the tournament. */
  filter: {
    genders: GenderEnum[];
    limit: number;
  };
  /** Function to execute when the user pauses the tournament, saving their
   * progress. */
  pauseTournamentHandler: () => void;
}

const Glicko: React.FC<GlickoProps> = (props) => {
  /* -------------------------------------------- Setup ------------------------------------------- */

  const { loading, error, data } = useQuery(GET_PERFORMERS, {
    variables: { ...props.filter },
  });

  const tournament = new Glicko2();

  // Reusable query setup
  const [getPerformerImage] = useLazyQuery(GET_PERFORMER_IMAGE);

  // Performer data for participating players
  const [performers, setPerformers] = useState<GlickoPerformerData[]>([]);

  // The list of matches, based on pairs of indices referring to the
  // `performers` list.
  const [matchList, setMatchList] = useState<[number, number][]>([]);

  // The index of the current match.
  const [matchIndex, setMatchIndex] = useState<number>(0);

  // The Glicko data for played match results
  const [matchResults, setMatchResults] = useState<GlickoMatchResult[]>([]);

  // The show state of various modals
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  // Once data is available, update the required data
  useEffect(() => {
    if (!loading && !error) {
      // First format the fetched data
      const formattedData = (data.findPerformers.performers as Performer[]).map(
        (p) => {
          const customFields = p.custom_fields as PerformerCustomFields;
          const player = tournament.makePlayer(
            customFields.glicko_rating ?? GLICKO_RATING_DEFAULT,
            customFields.glicko_deviation ?? GLICKO_DEVIATION_DEFAULT,
            customFields.glicko_volatility ?? GLICKO_VOLATILITY_DEFAULT
          );

          return {
            id: p.id,
            imageID: "0",
            imageSrc: p.image_path ?? "",
            name: p.name,
            player,
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

  // matchList.forEach((m) => {
  //   console.log(performers[m[0]].name + " vs. " + performers[m[1]].name);
  // });

  // console.log(matchResults);

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

  /* ---------------------------------------- Handle pause ---------------------------------------- */

  const handlePause: React.MouseEventHandler<HTMLButtonElement> = () =>
    setShowPauseModal(true);

  /* -------------------------------------- Handle selection -------------------------------------- */

  /** Handle selecting a winner from a pair, where `winner` is the index on the
   * board of the winning player, i.e. `0` for left or `1` for right. */
  const handleSelect = (winner: 0 | 1) => {
    // Create the match result
    const result: GlickoMatchResult = [
      performers[matchList[matchIndex][0]].player,
      performers[matchList[matchIndex][1]].player,
      winner,
    ];

    // Update the match results list
    setMatchResults([...matchResults, result]);

    // Set up the next match if there is one, else open the end tournament
    // modal.
    if (matchIndex < matchList.length - 1) setMatchIndex(matchIndex + 1);
    else setShowEndModal(true);
  };

  /* -------------------------------------- Handle skip match ------------------------------------- */

  /** Handle skipping a match, i.e. announcing a draw. */
  const handleSkip: React.MouseEventHandler<HTMLButtonElement> = () => {
    // Create the match result
    const result: GlickoMatchResult = [
      performers[matchList[matchIndex][0]].player,
      performers[matchList[matchIndex][1]].player,
      0.5,
    ];

    // Update the match results list
    setMatchResults([...matchResults, result]);

    // Set up the next match if there is one, else open the end tournament
    // modal.
    if (matchIndex < matchList.length - 1) setMatchIndex(matchIndex + 1);
    else setShowEndModal(true);
  };

  /* ---------------------------------- Handle abandon tournament --------------------------------- */

  const handleStop: React.MouseEventHandler<HTMLButtonElement> = () =>
    setShowAbandonModal(true);

  /* -------------------------------------- Handle undo match ------------------------------------- */

  const handleUndo: React.MouseEventHandler<HTMLButtonElement> = () => {
    // Set up the previous match
    setMatchIndex(matchIndex - 1);

    // Remove the previous result
    const updatedMatchResults = matchResults.slice(0, -1);
    setMatchResults(updatedMatchResults);
  };

  /* --------------------------------------- Progress board --------------------------------------- */

  const tableData: [string, string, 0 | 0.5 | 1][] = matchResults.map(
    (m, i) => {
      const match = matchList[i];
      return [performers[match[0]].name, performers[match[1]].name, m[2]];
    }
  );

  /* ------------------------------------------- Modals ------------------------------------------- */

  /** Handle closing the "End tournament" modal. */
  const handleCloseEndModal = () => {
    // Close the modal
    setShowEndModal(false);

    // Undo the last result
    const updatedMatchResults = matchResults.slice(0, -1);
    setMatchResults(updatedMatchResults);
  };

  /** Handle closing the "Abandon tournament" modal. */
  const handleCloseAbandonModal = () => setShowAbandonModal(false);

  /** Handle closing the "Pause tournament" modal. */
  const handleClosePauseModal = () => setShowPauseModal(false);

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <>
      <main className={styles.glicko}>
        <OneVsOneBoard
          changeImageHandler={handleImageChange}
          clickSelectHandler={handleSelect}
          clickPauseHandler={handlePause}
          clickSkipHandler={handleSkip}
          clickStopHandler={handleStop}
          clickUndoHandler={handleUndo}
          matchIndex={matchIndex}
          profiles={[
            performers[matchList[matchIndex][0]],
            performers[matchList[matchIndex][1]],
          ]}
        />
        <ProgressBoard
          columnTitles={["Choice A", "Choice B"]}
          reverse
          tableData={tableData}
          title="Progress"
        />
      </main>
      <EndTournamentModal
        closeModalHandler={handleCloseEndModal}
        endTournamentHandler={props.endTournamentHandler}
        show={showEndModal}
      />
      <AbandonTournamentModal
        abandonTournamentHandler={props.abandonTournamentHandler}
        closeModalHandler={handleCloseAbandonModal}
        show={showAbandonModal}
      />
      <PauseTournamentModal
        pauseTournamentHandler={props.pauseTournamentHandler}
        closeModalHandler={handleClosePauseModal}
        show={showPauseModal}
      />
    </>
  );
};

export default Glicko;

/* ---------------------------------------------------------------------------------------------- */
/*                                      End tournament modal                                      */
/* ---------------------------------------------------------------------------------------------- */

/** Modal that appears when ending a tournament after all matches have been
 * completed. */
const EndTournamentModal: React.FC<{
  closeModalHandler: () => void;
  endTournamentHandler: () => void;
  show: boolean;
}> = (props) => {
  document.body.classList[props.show ? "add" : "remove"]("modal-open");
  document.body.style = props.show ? "padding-right: 15px" : "";

  return (
    <Modal
      buttons={[
        {
          key: "cancel",
          children: "Cancel",
          className: "btn btn-secondary",
          onClick: props.closeModalHandler,
          type: "button",
        },
        {
          key: "confirm",
          children: "Confirm",
          className: "btn btn-primary",
          onClick: props.endTournamentHandler,
          type: "submit",
        },
      ]}
      closeModalHandler={props.closeModalHandler}
      show={props.show}
      title="Tournament complete!"
    >
      <p>Would you like to submit and view the results?</p>
    </Modal>
  );
};

/* ---------------------------------------------------------------------------------------------- */
/*                                      Abandon tournament modal                                     */
/* ---------------------------------------------------------------------------------------------- */

/** Modal that appears when ending a tournament before all matches have been
 * completed, and discarding the progress. */
const AbandonTournamentModal: React.FC<{
  abandonTournamentHandler: () => void;
  closeModalHandler: () => void;
  show: boolean;
}> = (props) => {
  document.body.classList[props.show ? "add" : "remove"]("modal-open");
  document.body.style = props.show ? "padding-right: 15px" : "";

  return (
    <Modal
      buttons={[
        {
          key: "no",
          children: "Cancel",
          className: "btn btn-secondary",
          onClick: props.closeModalHandler,
          type: "submit",
        },
        {
          key: "yes",
          children: "Yes, abandon",
          className: "btn btn-danger",
          onClick: props.abandonTournamentHandler,
          type: "button",
        },
      ]}
      closeModalHandler={props.closeModalHandler}
      show={props.show}
      title="Abandon the tournament?"
    >
      <>
        <p>
          If you abandon the current tournament, you will quit and lose all
          progress. This cannot be undone.
        </p>
        <p>Are you sure you wish to abandon the tournament?</p>
      </>
    </Modal>
  );
};

/* ---------------------------------------------------------------------------------------------- */
/*                                     Pause tournament modal                                     */
/* ---------------------------------------------------------------------------------------------- */

/** Modal that appears when ending a tournament before all matches have been
 * completed, but saving the progress. */
const PauseTournamentModal: React.FC<{
  pauseTournamentHandler: () => void;
  closeModalHandler: () => void;
  show: boolean;
}> = (props) => {
  document.body.classList[props.show ? "add" : "remove"]("modal-open");
  document.body.style = props.show ? "padding-right: 15px" : "";

  return (
    <Modal
      buttons={[
        {
          key: "no",
          children: "Cancel",
          className: "btn btn-secondary",
          onClick: props.closeModalHandler,
          type: "submit",
        },
        {
          key: "yes",
          children: "Yes, pause",
          className: "btn btn-primary",
          onClick: props.pauseTournamentHandler,
          type: "button",
        },
      ]}
      closeModalHandler={props.closeModalHandler}
      show={props.show}
      title="Pause the tournament?"
    >
      <>
        <p>
          If you pause the current tournament, your progress will be saved to
          your Stash config. You can then continue the tournament at a later
          date.
        </p>
        <p>Would you like to pause the tournament?</p>
      </>
    </Modal>
  );
};
