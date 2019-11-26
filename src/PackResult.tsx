import React from "react";
import {PackResponse} from "./fetchPack";

type Props = {
  result: PackResponse;
};

export const PackResult: React.FC<Props> = ({result}) => {
  return (
    <>
      <h2>Packing result</h2>
      {result.response.bins_packed.map((bin, index) => (
        <>
          <h3>Container #{index + 1}</h3>
          <div className="binFirstRow">
            <div>
              <h4>Container ID: {bin.bin_data.id}</h4>
              <img src={bin.image_complete} alt="Picture of complete packing"/>
            </div>
            <div>
              <h4>Dimensions</h4>
              <table>
                <tr>
                  <td>Width:</td>
                  <td>{bin.bin_data.w}</td>
                </tr>
                <tr>
                  <td>Height:</td>
                  <td>{bin.bin_data.h}</td>
                </tr>
                <tr>
                  <td>Depth:</td>
                  <td>{bin.bin_data.d}</td>
                </tr>
                <tr>
                  <td>Max. wgt.:</td>
                  <td>{bin.bin_data.weight}</td>
                </tr>
              </table>
            </div>
            <div>
              <table>
                <tr>
                  <th>Packed items :</th>
                  <td>{bin.items.length}</td>
                </tr>
                <tr>
                  <th>Space taken :</th>
                  <td>{bin.bin_data.used_space} %</td>
                </tr>
                <tr>
                  <th>Weight taken :</th>
                  <td>{bin.bin_data.used_weight} %</td>
                </tr>
                <tr>
                  <th>Packing time :</th>
                  <td>{bin.packing_time} (s)</td>
                </tr>
                <tr>
                  <th>Images generation time :</th>
                  <td>{bin.images_generation_time} (s)</td>
                </tr>
              </table>
            </div>
          </div>
          {bin.not_packed_items.length > 0 ? (
            <>
              <h3>Items that have not been packed</h3>
              <ul>
                {bin.not_packed_items.map(item => (
                  <li><b>ID:</b> {item.id} <b>Quantity:</b> {item.q}</li>
                ))}
              </ul>
            </>
          ) : (
            <h3>All items have been packed</h3>
          )}
        </>
      ))}
    </>
  )
}
