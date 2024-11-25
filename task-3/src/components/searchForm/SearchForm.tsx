import { FC, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchForm.module.css";
import search from "../../assets/images/svg/search.svg";

const SearchForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const country = searchParams.get("country");

  useEffect(() => {
    if (!country) {
      setInputValue("");
    } else {
      setInputValue(country);
    }
  }, [country]);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const country: string = inputValue.toLowerCase();

    if (country.length > 0) {
      setSearchParams({ country: country });
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <input
        type="text"
        placeholder="Enter country here..."
        minLength={1}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>
        <img src={search} alt="button for form" />
      </button>
    </form>
  );
};

export default SearchForm;
