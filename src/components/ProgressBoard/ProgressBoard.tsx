import React from "react";
import styles from "./ProgressBoard.module.scss";

interface ProgressBoardProps {}

const ProgressBoard: React.FC<ProgressBoardProps> = (_props) => {
  return <section className={styles["progress-board"]}>Progress board</section>;
};

export default ProgressBoard;
