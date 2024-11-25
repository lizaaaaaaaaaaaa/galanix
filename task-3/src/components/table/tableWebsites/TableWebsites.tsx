import { FC } from "react";
import styles from "./TableWebsites.module.css";

const TableWebsites: FC<{ website: string }> = ({ website }) => {
  return (
    <li>
      <a href={website} className={styles.link}>
        {website}
      </a>
    </li>
  );
};

export default TableWebsites;
