import React, {useState} from 'react';
import './App.css';
import { InputForm } from "./form/InputForm";
import {Bins, Items} from "./types";
import {fetchPack} from "./fetchPack";

const App: React.FC = () => {
  const [result, setResult] = useState(null);
  const onSubmit = (bins: Bins, items: Items) => {
    fetchPack(bins, items)
      .then(responseBody => {
        setResult(responseBody);
      });
  };
  return <>
    <InputForm onSubmit={onSubmit} />
    <div>{JSON.stringify(result)}</div>
  </>;
}

export default App;
