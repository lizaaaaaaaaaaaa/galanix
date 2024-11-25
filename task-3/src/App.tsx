import { FC, useState } from "react";
import SearchForm from "./components/searchForm/SearchForm";
import Table from "./components/table/Table";
import ResetButton from "./components/resetButton/ResetButton";
import CounterSavedUniversities from "./components/counterSavedUniversities/CounterSavedUniversities";

const App: FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const followCheckedInputsHandler = () => {
    setChecked(!checked);
  };
  
  return (
    <div className="container">
      <CounterSavedUniversities reloadState={checked} />
      <SearchForm />
      <ResetButton followCheckedInputsHandler={followCheckedInputsHandler} />
      <Table followCheckedInputsHandler={followCheckedInputsHandler} />
    </div>
  );
};

export default App;
