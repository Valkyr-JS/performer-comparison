import React from "react";
import styles from "./OneVsOneBoard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons/faForwardStep";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";

interface OneVsOneBoardProps {
  profiles: [ProfileProps, ProfileProps];
  /** Executes when the user click the skip button. */
  clickSkipHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** Executes when the user click the stop button. */
  clickStopHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** Executes when the user click the undo button. */
  clickUndoHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = (props) => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <div className={styles["profiles"]}>
        <Profile {...props.profiles[0]} />
        <Profile {...props.profiles[1]} />
      </div>
      <div className={styles["tools"]}>
        <button className="btn btn-danger" onClick={props.clickStopHandler}>
          <span className="sr-only">End tournament</span>
          <FontAwesomeIcon icon={faStop} />
        </button>
        <button className="btn btn-secondary" onClick={props.clickUndoHandler}>
          <span className="sr-only">Undo</span>
          <FontAwesomeIcon icon={faRotateLeft} />
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

interface ProfileProps {
  id: Performer["id"];
  imageSrc: string;
  name: Performer["name"];
  /** The performer's rank before starting the tournament. */
  rank: number;
  /** Executes when the user clicks to change the current performer image. */
  changeImageHandler: React.MouseEventHandler<HTMLButtonElement>;
  /** Executes when the user selects the winning performer. */
  clickSelectHandler: React.MouseEventHandler<HTMLElement>;
}

const Profile = (props: ProfileProps) => {
  return (
    <div className={styles["profile"]}>
      <h2>{props.name}</h2>
      <span className={styles["rank"]}>{props.rank ?? "N/A"}</span>
      <div className={styles["profile-image"]}>
        <img src={props.imageSrc} alt={props.name} />
      </div>
      <div className={styles["button-list"]}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.clickSelectHandler}
        >
          Select
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={props.changeImageHandler}
        >
          <span className="sr-only">Change image for {props.name}</span>
          New image
        </button>
      </div>
    </div>
  );
};
