import React from "react";
import {useKeys} from "./useKeys";
import {useFormContext} from "react-hook-form";

export const ItemsInput: React.FC = () => {
  const {register} = useFormContext();
  const {keys, remove, add} = useKeys();

  return <>
    {keys.map(key => {
      const baseName = `items[${key}]`;
      const isFirst = key === 0;
      return (
        <div className="containerForm" key={key}>
          <label>
            <div>Id</div>
            <input type="text" name={`${baseName}.id`} required={true} ref={register}
                   defaultValue={`Item${key + 1}`}/>
          </label>
          <label>
            <div>Wdt</div>
            <input type="number" name={`${baseName}.w`} required={true} ref={register}
                   defaultValue={isFirst ? 4 : undefined}/>
          </label>
          <label>
            <div>Hgt</div>
            <input type="number" name={`${baseName}.h`} required={true} ref={register}
                   defaultValue={isFirst ? 5 : undefined}/>
          </label>
          <label>
            <div>Dpt</div>
            <input type="number" name={`${baseName}.d`} required={true} ref={register}
                   defaultValue={isFirst ? 6 : undefined}/>
          </label>
          <label>
            <div>Wgt</div>
            <input type="number" name={`${baseName}.wg`} required={true} ref={register}
                   defaultValue={isFirst ? 0 : undefined}/>
          </label>
          <label>
            <div>Qty</div>
            <input type="number" name={`${baseName}.q`} required={true} ref={register}
                   defaultValue={isFirst ? 5 : undefined}/>
          </label>
          <label>
            <div>VR</div>
            <input type="checkbox" name={`${baseName}.vr`} ref={register} defaultChecked={true}/>
          </label>
          <div>
            <button onClick={event => {
              remove(key);
              event.preventDefault();
            }}>Remove
            </button>
          </div>
        </div>
      );
    })}
    <button onClick={event => {
      add();
      event.preventDefault();
    }}>Add item
    </button>
  </>;
}
