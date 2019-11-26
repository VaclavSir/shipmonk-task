import React from "react";
import useForm, {FormContext} from "react-hook-form";
import {decodeInputFormData} from "./decodeInputFormData";
import {Bins, Items} from "../types";
import {BinsInput} from "./BinsInput";
import {ItemsInput} from "./ItemsInput";

type Props = {
  onSubmit: (bins: Bins, items: Items) => void;
};

export const InputForm: React.FC<Props> = ({onSubmit}) => {
  const formMethods = useForm();

  const submit = (data: unknown) => {
    onSubmit(...decodeInputFormData(data));
  }

  return (
    <FormContext {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submit)}>
        <h2>Containers</h2>
        <BinsInput />

        <h2>Items</h2>
        <ItemsInput />

        <hr/>
        <button type="submit">Pack</button>
      </form>
    </FormContext>
  );
}
