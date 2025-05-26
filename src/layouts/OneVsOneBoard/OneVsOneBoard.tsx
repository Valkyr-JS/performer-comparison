import React from "react";
import styles from "./OneVsOneBoard.module.scss";

interface OneVsOneBoardProps {}

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = () => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <header>
        <h1>One-on-One</h1>
      </header>
      <div className={styles["filters"]}>
        <button style={{ width: "100%" }}>Update filters</button>
      </div>
      <div className={styles["profiles"]}>
        <Profile
          name="Performer A"
          image={url + "/performer/91/image?t=1746466658"}
        />
        <Profile
          name="Performer B"
          image={url + "/performer/1/image?t=1748116759"}
        />
      </div>
      <div className={styles["tools"]}>
        <button style={{ marginBottom: "10px" }}>Undo</button>
        <button>Leaderboard</button>
      </div>
    </section>
  );
};

export default OneVsOneBoard;

/** TEMP */

interface ProfileProps {
  image: string;
  name: string;
}

const Profile = (props: ProfileProps) => {
  return (
    <div className={styles["profile"]}>
      <h2>{props.name}</h2>
      <img src={props.image} alt="" />
      <div className={styles["button-list"]}>
        <button type="button">Select</button>
        <button type="button">Change img</button>
      </div>
    </div>
  );
};
