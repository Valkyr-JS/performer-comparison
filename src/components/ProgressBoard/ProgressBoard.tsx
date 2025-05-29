import React from "react";
import styles from "./ProgressBoard.module.scss";

interface ProgressBoardProps {
  columnTitles: [string, string];
  /** Whether to display the progress in reverse order, i.e. latest > oldest
   * instead of oldest > latest. */
  reverse?: boolean;
  /** The column data, and the index of the winner. */
  tableData: [optionA: string, optionB: string, winner: 0 | 0.5 | 1][];
  title: string;
}

const ProgressBoard: React.FC<ProgressBoardProps> = (props) => {
  const tableData = !!props.reverse
    ? [...props.tableData].reverse()
    : props.tableData;

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
          {tableData.map((options, i) => {
            const round = props.reverse ? tableData.length - i : i + 1;
            return (
              <tr key={round}>
                <td>{round}</td>
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
