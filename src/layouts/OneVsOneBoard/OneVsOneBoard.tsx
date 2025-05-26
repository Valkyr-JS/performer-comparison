import React, { useState } from "react";
import styles from "./OneVsOneBoard.module.scss";

interface OneVsOneBoardProps {
  profiles: [ProfileProps, ProfileProps];
}

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = (props) => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <header>
        <h1>One-on-One</h1>
      </header>
      <div className={styles["filters"]}>
        <button style={{ width: "100%" }}>Update filters</button>
      </div>
      <div className={styles["profiles"]}>
        <Profile {...props.profiles[0]} />
        <Profile {...props.profiles[1]} />
      </div>
      <div className={styles["tools"]}>
        <button style={{ marginBottom: "10px" }}>Undo</button>
        <button>Leaderboard</button>
      </div>
    </section>
  );
};

export default OneVsOneBoard;

/* ------------------------------------------- Profile ------------------------------------------ */

interface ProfileProps {
  /** The performer's profile image. */
  cover: Performer["image_path"];
  id: Performer["id"];
  name: Performer["name"];
}

const Profile = (props: ProfileProps) => {
  const [src, _setSrc] = useState(props.cover ?? "FALLBACK-IMAGE-SRC");

  return (
    <div className={styles["profile"]}>
      <h2>{props.name}</h2>
      <img src={src} alt={props.name} />
      <div className={styles["button-list"]}>
        <button type="button">Select</button>
        <button type="button">
          <span className="sr-only">Change image for {props.name}</span>
        </button>
      </div>
    </div>
  );
};
