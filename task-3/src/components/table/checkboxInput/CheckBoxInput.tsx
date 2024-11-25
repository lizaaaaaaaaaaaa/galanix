import { FC, useEffect, useState } from "react";
import styles from "./CheckBoxInput.module.css";

type PropsType = {
  name: string;
  followCheckedInputsHandler: () => void;
};

const CheckBoxInput: FC<PropsType> = ({ name, followCheckedInputsHandler }) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(
      (
        JSON.parse(localStorage.getItem("universities") || "[]") as string[]
      ).includes(name)
    );
  }, [name]);

  const inputCheckedHandler = () => {
    const alreadyCheckedUniversities: string[] = JSON.parse(
      localStorage.getItem("universities") || "[]"
    );

    let updatedUniversities: string[];

    if (checked) {
      updatedUniversities = alreadyCheckedUniversities.filter(
        (item) => item !== name
      );
    } else {
      updatedUniversities = [...alreadyCheckedUniversities, name];
    }

    localStorage.setItem("universities", JSON.stringify(updatedUniversities));
    setChecked(!checked);
    followCheckedInputsHandler();
  };

  return (
    <input
      type="checkbox"
      className={styles.input}
      id="saveToList"
      name={name}
      onChange={inputCheckedHandler}
      checked={checked}
    />
  );
};

export default CheckBoxInput;
