import { FC } from "react";
import SearchForm from "./components/searchForm/SearchForm";
import Table from "./components/table/Table";
import ResetButton from "./components/table/resetButton/ResetButton";

const App: FC = () => {
  return (
    <div className="container">
      <SearchForm />
      <ResetButton />
      <Table />
    </div>
  );
};

export default App;
