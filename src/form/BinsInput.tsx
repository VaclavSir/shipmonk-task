import React from "react";
import {useKeys} from "./useKeys";
import {useFormContext} from "react-hook-form";

export const BinsInput: React.FC<any> = () => {
  const {register} = useFormContext();
  const {keys, remove, add} = useKeys();
  return <>
    {keys.map(key => {
      const baseName = `bins[${key}]`;
      const isFirst = key === 0;
      return (
        <div className="containerForm" key={key}>
          <label>
            <div>Id</div>
            <input type="text" name={`${baseName}.id`} required={true} ref={register}
                   defaultValue={`Bin${key + 1}`}/>
          </label>
          <label>
            <div>Wdt</div>
            <input type="number" name={`${baseName}.w`} required={true} ref={register}
                   defaultValue={isFirst ? 10 : undefined}/>
          </label>
          <label>
            <div>Hgt</div>
            <input type="number" name={`${baseName}.h`} required={true} ref={register}
                   defaultValue={isFirst ? 10 : undefined}/>
          </label>
          <label>
            <div>Dpt</div>
            <input type="number" name={`${baseName}.d`} required={true} ref={register}
                   defaultValue={isFirst ? 10 : undefined}/>
          </label>
          <label>
            <div>Max. wgt.</div>
            <input type="number" name={`${baseName}.max_wg`} required={true} ref={register}
                   defaultValue={isFirst ? 0 : undefined}/>
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
    }}>Add container
    </button>
  </>;
}
