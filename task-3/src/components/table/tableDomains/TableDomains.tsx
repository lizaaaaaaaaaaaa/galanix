import { FC } from "react";

const TableDomains: FC<{ domain: string }> = ({ domain }) => {
  return <li>{domain}</li>;
};

export default TableDomains;
