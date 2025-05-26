import React from "react";
import styles from "./OneVsOneBoard.module.scss";

interface OneVsOneBoardProps {}

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = () => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <header>
        <h1>1 vs. 1</h1>
        <button>*</button>
      </header>
      <div className={styles["profiles"]}>
        <Profile />
        <Profile />
      </div>
      <div className={styles["tools"]}>
        <button>Undo</button>
      </div>
    </section>
  );
};

export default OneVsOneBoard;

/** TEMP */
const Profile = () => {
  return <div>Profile</div>;
};
