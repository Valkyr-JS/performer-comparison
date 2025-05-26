import React from "react";
import styles from "./OneVsOneBoard.module.scss";

interface OneVsOneBoardProps {}

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = () => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <header>
        <h1>One-on-One</h1>
        <button>*</button>
      </header>
      <div className={styles["profiles"]}>
        <Profile
          name="Dani Daniels"
          image={url + "/performer/91/image?t=1746466658"}
        />
        <Profile
          name="Danielle Sharp"
          image={url + "/performer/1/image?t=1748116759"}
        />
      </div>
      <div className={styles["tools"]}>
        <button>Undo</button>
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
      <img src={props.image} alt="" />
      <div>
        <button type="button">{props.name}</button>
      </div>
    </div>
  );
};
