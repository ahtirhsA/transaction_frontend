import React from "react";
import "./Record.css";

const Record = (props) => {
  const { item } = props;
  const { id, amount, transaction_type, user, timestamp, status } = item;

  const extractDateTime = new Date(timestamp);
  const k = extractDateTime.toLocaleTimeString().split(" ");
  const q = k[0].split(":");
  const time = `${q.splice(0, 2).join(":")} ${k[1]}`;

  const date = `${extractDateTime.getDate()}-${extractDateTime.getMonth() + 1}-${extractDateTime.getFullYear()}`;

  const statusClass = status === "COMPLETED" ? "status-success" : "status-failure";

  return (
    <tr>
      <td>{date}</td>
      <td>{time}</td>
      <td>{transaction_type === "DEPOSIT" ? `+ ${amount}` : `- ${amount}`}</td>
      <td className={statusClass}>{status === "COMPLETED" ? "Success" : "Failure"}</td>
    </tr>
  );
};

export default Record;
