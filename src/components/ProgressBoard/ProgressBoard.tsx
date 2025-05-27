import React from "react";
import styles from "./ProgressBoard.module.scss";

interface ProgressBoardProps {
  title: string;
}

const ProgressBoard: React.FC<ProgressBoardProps> = (props) => {
  return (
    <section className={styles["progress-board"]}>
      <h2>{props.title}</h2>
      <table>
        <thead>
          <tr>
            <th>Round #</th>
            <th>Option 1</th>
            <th>Option 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>Performer D</td>
            <td>Performer C</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Performer A</td>
            <td>Performer C</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Performer A</td>
            <td>Performer B</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default ProgressBoard;
