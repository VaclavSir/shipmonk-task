import {Bins, Items} from "./types";
import { username, api_key } from './config.json'

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
  return body;
}
