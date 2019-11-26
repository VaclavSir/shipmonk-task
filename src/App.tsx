import React, {useCallback, useState} from 'react';
import useForm from 'react-hook-form'
import './App.css';

function useKeys(initialCount = 1) {
  const [keys, setKeys] = useState<ReadonlyArray<number>>(
      new Array(initialCount).fill(null).map((_, index) => index)
  );
  const add = useCallback(() => {
    setKeys(keys => [...keys, keys[keys.length - 1] + 1]);
  }, []);
  const remove = useCallback((indexToRemove: number) => {
    setKeys(keys => keys.filter(index => index !== indexToRemove));
  }, []);

  return {
    keys,
    add,
    remove,
  }
}

const App: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { keys: containerKeys, remove: removeContainer, add: addContainer } = useKeys();
  const { keys: itemKeys, remove: removeItem, add: addItem } = useKeys();

  const onSubmit = (data: any) => { alert(JSON.stringify(data)) };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Containers</h2>
      {containerKeys.map(key => {
        const baseName = `bins[${key}]`;
        return (
          <div className="containerForm" key={key}>
            <label>
              <div>Id</div>
              <input type="text" name={`${baseName}.id`} ref={register}/>
            </label>
            <label>
              <div>Wdt</div>
              <input type="number" name={`${baseName}.w`} ref={register}/>
            </label>
            <label>
              <div>Hgt</div>
              <input type="number" name={`${baseName}.h`} ref={register}/>
            </label>
            <label>
              <div>Dpt</div>
              <input type="number" name={`${baseName}.d`} ref={register}/>
            </label>
            <label>
              <div>Max. wgt.</div>
              <input type="number" name={`${baseName}.max_wg`} ref={register}/>
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
      <button onClick={event => { addContainer(); event.preventDefault(); }}>Add container</button>


      <h2>Items</h2>
      {itemKeys.map(key => {
        const baseName = `items[${key}]`;
        return (
          <div className="containerForm" key={key}>
            <label>
              <div>Id</div>
              <input type="text" name={`${baseName}.id`} ref={register}/>
            </label>
            <label>
              <div>Wdt</div>
              <input type="number" name={`${baseName}.w`} ref={register}/>
            </label>
            <label>
              <div>Hgt</div>
              <input type="number" name={`${baseName}.h`} ref={register}/>
            </label>
            <label>
              <div>Dpt</div>
              <input type="number" name={`${baseName}.d`} ref={register}/>
            </label>
            <label>
              <div>Wgt</div>
              <input type="number" name={`${baseName}.wg`} ref={register}/>
            </label>
            <label>
              <div>Qty</div>
              <input type="number" name={`${baseName}.q`} ref={register}/>
            </label>
            <label>
              <div>VR</div>
              <input type="checkbox" name={`${baseName}.q`} ref={register}/>
            </label>
            <div>
              <button onClick={event => {
                removeItem(key);
                event.preventDefault();
              }}>Remove</button>
            </div>
          </div>
        );
      })}
      <button onClick={event => { addItem(); event.preventDefault(); }}>Add item</button>

      <hr/>
      <button type="submit">Pack</button>
    </form>
  );
}

export default App;
