import React from "react";
import styles from "./OneVsOneBoard.module.scss";

interface OneVsOneBoardProps {}

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = () => {
  return (
    <section className={styles["one-vs-one-board"]}>One vs One board</section>
  );
};

export default OneVsOneBoard;
