import React, { FC } from "react";
import IUniversity from "../../../models/IUniversity";
import styles from "./TableRow.module.css";
import TableDomains from "../tableDomains/TableDomains";
import TableWebsites from "../tableWebsites/TableWebsites";

type PropsType = {
  number: number;
  university: IUniversity;
};

const TableRow: FC<PropsType> = ({ university, number }) => {
  return (
    <tr className={styles.table__row}>
      <td>{number}</td>
      <td>{university.name}</td>
      <td>{university.country}</td>
      <td>{university["state-province"]}</td>
      <td>{university.alpha_two_code}</td>
      <td>
        <ul>
          {university.domains.map((domain, index) => (
            <TableDomains key={index} domain={domain} />
          ))}
        </ul>
      </td>
      <td>
        <ul>
          {university.web_pages.map((webPage, index) => (
            <TableWebsites key={index} website={webPage} />
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
