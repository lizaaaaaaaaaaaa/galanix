import { FC, useEffect, useState } from "react";
import styles from "./CheckBoxInput.module.css";

const CheckBoxInput: FC<{ name: string }> = ({ name }) => {
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
