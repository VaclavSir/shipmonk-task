import * as t from "io-ts";
import {Bin, Item} from "./types";

export const inputFormData = t.interface({
  bins: t.array(
    t.union([
      t.nullType,
      t.interface({
        id: t.string,
        w: t.string,
        h: t.string,
        d: t.string,
        max_wg: t.string,
      }),
    ]),
  ),
  items: t.array(
    t.union([
      t.nullType,
      t.interface({
        id: t.string,
        w: t.string,
        h: t.string,
        d: t.string,
        wg: t.string,
        q: t.string,
        vr: t.boolean,
      }),
    ]),
  ),
});

function notEmpty<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}

export function decodeInputFormData(data: unknown): [ReadonlyArray<Bin>, ReadonlyArray<Item>] {
  const decoded = inputFormData.decode(data);
  if (decoded._tag === 'Right') {
    const bins = decoded.right.bins
      .filter(notEmpty)
      .map(bin => {
        return {
          id: bin.id,
          w: Number(bin.w),
          h: Number(bin.h),
          d: Number(bin.d),
          max_wg: Number(bin.max_wg),
        };
      });
    const items = decoded.right.items
      .filter(notEmpty)
      .map(item => {
        return {
          id: item.id,
          w: Number(item.w),
          h: Number(item.h),
          d: Number(item.d),
          wg: Number(item.wg),
          q: Number(item.q),
          vr: item.vr ? 1 as 1 : 0 as 0,
        };
      });
    return [bins, items];
  } else {
    throw new Error("Invalid shape of input data, shouldn't ever happen");
  }
}
