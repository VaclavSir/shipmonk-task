import React from "react";
import useForm from "react-hook-form";
import {useKeys} from "./useKeys";
import {decodeInputFormData} from "./codecs";
import {Bins, Items} from "./types";

type Props = {
  onSubmit: (bins: Bins, items: Items) => void;
};

export const InputForm: React.FC<Props> = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  const {keys: containerKeys, remove: removeContainer, add: addContainer} = useKeys();
  const {keys: itemKeys, remove: removeItem, add: addItem} = useKeys();

  const submit = (data: unknown) => {
    onSubmit(...decodeInputFormData(data));
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Containers</h2>
      {containerKeys.map(key => {
        const baseName = `bins[${key}]`;
        const isFirst = key === 0;
        return (
          <div className="containerForm" key={key}>
            <label>
              <div>Id</div>
              <input type="text" name={`${baseName}.id`} required={true} ref={register} defaultValue={`Bin${key + 1}`}/>
            </label>
            <label>
              <div>Wdt</div>
              <input type="number" name={`${baseName}.w`} required={true} ref={register} defaultValue={isFirst ? 10 : undefined}/>
            </label>
            <label>
              <div>Hgt</div>
              <input type="number" name={`${baseName}.h`} required={true} ref={register} defaultValue={isFirst ? 10 : undefined}/>
            </label>
            <label>
              <div>Dpt</div>
              <input type="number" name={`${baseName}.d`} required={true} ref={register} defaultValue={isFirst ? 10 : undefined}/>
            </label>
            <label>
              <div>Max. wgt.</div>
              <input type="number" name={`${baseName}.max_wg`} required={true} ref={register} defaultValue={isFirst ? 0 : undefined}/>
            </label>
            <div>
              <button onClick={event => {
                removeContainer(key);
                event.preventDefault();
              }}>Remove
              </button>
            </div>
          </div>
        );
      })}
      <button onClick={event => {
        addContainer();
        event.preventDefault();
      }}>Add container
      </button>


      <h2>Items</h2>
      {itemKeys.map(key => {
        const baseName = `items[${key}]`;
        const isFirst = key === 0;
        return (
          <div className="containerForm" key={key}>
            <label>
              <div>Id</div>
              <input type="text" name={`${baseName}.id`} required={true} ref={register} defaultValue={`Item${key + 1}`}/>
            </label>
            <label>
              <div>Wdt</div>
              <input type="number" name={`${baseName}.w`} required={true} ref={register} defaultValue={isFirst ? 4 : undefined}  />
            </label>
            <label>
              <div>Hgt</div>
              <input type="number" name={`${baseName}.h`} required={true} ref={register} defaultValue={isFirst ? 5 : undefined}/>
            </label>
            <label>
              <div>Dpt</div>
              <input type="number" name={`${baseName}.d`} required={true} ref={register} defaultValue={isFirst ? 6 : undefined}/>
            </label>
            <label>
              <div>Wgt</div>
              <input type="number" name={`${baseName}.wg`} required={true} ref={register} defaultValue={isFirst ? 0 : undefined}/>
            </label>
            <label>
              <div>Qty</div>
              <input type="number" name={`${baseName}.q`} required={true} ref={register} defaultValue={isFirst ? 5 : undefined}/>
            </label>
            <label>
              <div>VR</div>
              <input type="checkbox" name={`${baseName}.vr`} ref={register} defaultChecked={true}/>
            </label>
            <div>
              <button onClick={event => {
                removeItem(key);
                event.preventDefault();
              }}>Remove
              </button>
            </div>
          </div>
        );
      })}
      <button onClick={event => {
        addItem();
        event.preventDefault();
      }}>Add item
      </button>

      <hr/>
      <button type="submit">Pack</button>
    </form>
  );
}