import React, {useState} from 'react';
import './App.css';
import { InputForm } from "./form/InputForm";
import {Bins, Items} from "./types";
import {fetchPack, PackResponse} from "./fetchPack";
import {PackResult} from "./PackResult";

const App: React.FC = () => {
  const [result, setResult] = useState<PackResponse | null>(null);
  const onSubmit = (bins: Bins, items: Items) => {
    fetchPack(bins, items)
      .then(result => {
        setResult(result);
      });
  };
  return <>
    <InputForm onSubmit={onSubmit} />
    {result && <PackResult result={result}/>}
  </>;
}

export default App;
