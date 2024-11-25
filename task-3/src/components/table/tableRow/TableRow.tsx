import React, { FC } from "react";
import IUniversity from "../../../models/IUniversity";
import styles from "./TableRow.module.css";
import TableDomains from "../tableDomains/TableDomains";
import TableWebsites from "../tableWebsites/TableWebsites";
import CheckBoxInput from "../checkboxInput/CheckBoxInput";

type PropsType = {
  number: number;
  university: IUniversity;
  followCheckedInputsHandler: () => void;
};

const TableRow: FC<PropsType> = ({ university, number, followCheckedInputsHandler }) => {
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
      <td>
        <CheckBoxInput
          name={university.name}
          followCheckedInputsHandler={followCheckedInputsHandler}
        />
      </td>
    </tr>
  );
};

export default TableRow;
