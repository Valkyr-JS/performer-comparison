import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons/faForwardStep";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { GET_PERFORMER_IMAGE } from "@/apollo/queries";
import styles from "./OneVsOneBoard.module.scss";
import type { GlickoPerformerData } from "../../../types/app";

interface OneVsOneBoardProps {
  /** Executes when the user clicks to change the current performer image. */
  changeImageHandler: (performerID: string, prevID: number) => void;
  /** Executes when the user click the pause button. */
  clickPauseHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** Executes when the user selects the winning performer. */
  clickSelectHandler: (winner: 0 | 1) => void;
  /** Executes when the user click the skip button. */
  clickSkipHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** Executes when the user click the stop button. */
  clickStopHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** Executes when the user click the undo button. */
  clickUndoHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** The zero-based index of the current match. */
  matchIndex: number;
  /** Props for the two profiles currently displayed on the board. */
  profiles: [GlickoPerformerData, GlickoPerformerData];
}

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = (props) => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <div className={styles["profiles"]}>
        <Profile
          {...props.profiles[0]}
          changeImageHandler={props.changeImageHandler}
          clickSelectHandler={props.clickSelectHandler}
          position={0}
        />
        <Profile
          {...props.profiles[1]}
          changeImageHandler={props.changeImageHandler}
          clickSelectHandler={props.clickSelectHandler}
          position={1}
        />
      </div>
      <div className={styles["tools"]}>
        <button
          className="btn btn-secondary"
          disabled={props.matchIndex === 0}
          onClick={props.clickUndoHandler}
        >
          <span className="sr-only">Undo</span>
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
        <button className="btn btn-danger" onClick={props.clickStopHandler}>
          <span className="sr-only">End tournament</span>
          <FontAwesomeIcon icon={faStop} />
        </button>
        <button className="btn btn-secondary" onClick={props.clickPauseHandler}>
          <span className="sr-only">Pause tournament</span>
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button className="btn btn-secondary" onClick={props.clickSkipHandler}>
          <span className="sr-only">Skip</span>
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>
    </section>
  );
};

export default OneVsOneBoard;

/* ---------------------------------------------------------------------------------------------- */
/*                                        Profile component                                       */
/* ---------------------------------------------------------------------------------------------- */

interface ProfileProps extends GlickoPerformerData {
  /** Executes when the user clicks to change the current performer image. */
  changeImageHandler: (performerID: string, prevID: number) => void;
  /** Executes when the user selects the winning performer. */
  clickSelectHandler: (winner: 0 | 1) => void;
  /** Whether the profile is on the left, i.e. `0`, or right, i.e. `1` */
  position: 0 | 1;
}

const Profile = (props: ProfileProps) => {
  const [showImageButton, setShowImageButton] = useState(false);
  const handleImageChange = () =>
    props.changeImageHandler(props.id, +props.imageID);

  const [getPerformerImage] = useLazyQuery(GET_PERFORMER_IMAGE);

  // Identify on initial load whether to show the image button.
  useEffect(() => {
    getPerformerImage({
      variables: { performerID: props.id, prevID: +props.imageID },
    }).then((res) => setShowImageButton(res.data.findImages.count > 1));
  }, [props.id]);

  return (
    <div className={styles["profile"]}>
      <span className={styles["rating"]}>
        <FontAwesomeIcon icon={faTrophy} />{" "}
        <span className="sr-only">{props.name} rating: </span>
        {props.player.getRating() ?? "N/A"}
      </span>
      <div className={styles["profile-image"]}>
        <img src={props.imageSrc} alt={props.name} />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => props.clickSelectHandler(props.position)}
      >
        {props.name}
      </button>
      {showImageButton ? (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleImageChange}
        >
          <span className="sr-only">Change image for {props.name}</span>
          <FontAwesomeIcon icon={faImage} />
        </button>
      ) : null}
    </div>
  );
};
