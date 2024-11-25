import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./ResetButton.module.css";

const ResetButton: FC<{ followCheckedInputsHandler: () => void }> = ({
  followCheckedInputsHandler,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetBtnClickHandler = (): void => {
    searchParams.delete("country");
    setSearchParams(searchParams);
    localStorage.removeItem("universities");
    followCheckedInputsHandler();
  };

  return (
    <button onClick={resetBtnClickHandler} className={styles.btn}>
      Reset All
    </button>
  );
};

export default ResetButton;
