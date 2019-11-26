import * as t from 'io-ts';
import {Bins, Items} from "./types";
import { username, api_key } from './config.json'

const itemCodec = t.interface({
  id: t.string,
  w: t.number,
  h: t.number,
  d: t.number,
  wg: t.number,
  image_separated: t.string,
  image_sbs: t.string,
});

const responseCodec = t.interface({
  response: t.interface({
    bins_packed: t.array(
      t.interface({
        bin_data: t.interface({
          id: t.string,
          w: t.number,
          h: t.number,
          d: t.number,
          used_space: t.number,
          weight: t.number,
          used_weight: t.number,
          stack_height: t.number,
        }),
        image_complete: t.string,
        items: t.array(itemCodec),
        images_generation_time: t.number,
        packing_time: t.number,
        not_packed_items: t.array(t.interface({
          id: t.string,
          q: t.number,
        })),
      }),
    ),
  }),
});

export type PackResponse = t.TypeOf<typeof responseCodec>;

export async function fetchPack(bins: Bins, items: Items) {
  const response = await fetch('https://eu.api.3dbinpacking.com/packer/pack', {
    method: 'post',
    body: JSON.stringify({
      bins,
      items,
      username,
      api_key,
      params: {
        images_sbs: 1,
        images_complete: 1,
        images_separated: 1,
        stats: 1,
      },
    }),
  });
  const body = await response.json();
  const decoded = responseCodec.decode(body);
  if (decoded._tag === 'Right') {
    return decoded.right;
  }
  debugger
  throw new Error('Invalid response');
}
