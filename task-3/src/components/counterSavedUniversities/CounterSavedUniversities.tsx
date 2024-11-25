import { FC, useEffect, useState } from "react";
import styles from "./CounterSavedUniversities.module.css";

const CounterSavedUniversities: FC<{ reloadState: boolean }> = ({
  reloadState,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(
      (JSON.parse(localStorage.getItem("universities") || "[]") as string[])
        .length
    );
  }, [reloadState]);

  return (
    <section className={styles.counter}>
      Saved Universities: <b>{count.toString()}</b>
    </section>
  );
};

export default CounterSavedUniversities;
