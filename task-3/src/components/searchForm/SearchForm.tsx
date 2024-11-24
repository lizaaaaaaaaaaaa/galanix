import { FC, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchForm.module.css";
import search from "../../assets/images/svg/search.svg";

const SearchForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    const country: string = input.value.toLowerCase();

    if (country.length > 0) {
      setSearchParams({ country: country });
      console.log(searchParams);
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <input type="text" placeholder="Enter country here..." minLength={1} />
      <button>
        <img src={search} alt="button for form" />
      </button>
    </form>
  );
};

export default SearchForm;
