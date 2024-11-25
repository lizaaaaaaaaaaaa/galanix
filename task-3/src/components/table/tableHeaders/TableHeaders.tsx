import { FC } from "react";
import styles from "./TableHeaders.module.css";

const TableHeaders: FC = () => {
  return (
    <tr className={styles.table__headers}>
      <th>№</th>
      <th>Name</th>
      <th>Country</th>
      <th>State Province</th>
      <th>Alpha 2 code</th>
      <th>Domains</th>
      <th>Web Pages</th>
    </tr>
  );
};

export default TableHeaders;
