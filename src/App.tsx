import React from 'react';
import './App.css';
import { InputForm } from "./InputForm";

const App: React.FC = () => {
  const onSubmit = (...data: any) => {
    alert(JSON.stringify(data));
  };
  return <InputForm onSubmit={onSubmit} />;
}

export default App;
