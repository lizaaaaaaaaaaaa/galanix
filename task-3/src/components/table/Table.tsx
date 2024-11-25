import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchByCountry from "../../services/api.service";
import IUniversity from "../../models/IUniversity";
import TableHeaders from "./tableHeaders/TableHeaders";
import TableRow from "./tableRow/TableRow";
import styles from "./Table.module.css";
import Loader from "../UI/Loader/Loader";

const Table: FC<{ followCheckedInputsHandler: () => void }> = ({
  followCheckedInputsHandler,
}) => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IUniversity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");

  const country: string | null = searchParams.get("country");

  useEffect((): void => {
    if (country) {
      setIsLoading(true);
      searchByCountry(country)
        .then((values) => {
          setData(values);
        })
        .catch(() => {
          setHttpError("Something went wrong... Try again later!");
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [country]);

  if (isLoading) {
    return <Loader />;
  }

  if (httpError) {
    return <p className={styles.table__error}>{httpError}</p>;
  }

  if (!country) {
    return (
      <p className={styles.table__start}>
        Enter a country in the input to start the search!
      </p>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <p className={styles.table__empty}>
        We didn't find any universities matching your search!
      </p>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <TableHeaders />
      </thead>
      <tbody>
        {data.map((university, index) => (
          <TableRow
            key={index}
            number={index + 1}
            university={university}
            followCheckedInputsHandler={followCheckedInputsHandler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
