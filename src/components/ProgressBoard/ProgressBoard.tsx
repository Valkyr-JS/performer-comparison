import React from "react";
import styles from "./ProgressBoard.module.scss";

interface ProgressBoardProps {
  columnTitles: [string, string];
  /** The column data, and the index of the winner. */
  tableData: [optionA: string, optionB: string, winner: 0 | 1][];
  title: string;
}

const ProgressBoard: React.FC<ProgressBoardProps> = (props) => {
  return (
    <section className={styles["progress-board"]}>
      <h2>{props.title}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Round #</th>
            <th scope="col">{props.columnTitles[0]}</th>
            <th scope="col">{props.columnTitles[1]}</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((options, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{options[0]}</td>
                <td>{options[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProgressBoard;
