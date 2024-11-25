import { FC } from "react";
import SearchForm from "./components/searchForm/SearchForm";
import Table from "./components/table/Table";

const App:FC = () => {
  return (
    <div className="container">
      <SearchForm />
      <Table/>
    </div>
  );
};

export default App;
