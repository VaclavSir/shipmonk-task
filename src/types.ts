type Bin = {
  id: string;
  w: number;
  h: number;
  d: number;
  max_wg: number;
}

export type Bins = ReadonlyArray<Bin>;

type Item = {
  id: string;
  w: number;
  h: number;
  d: number;
  wg: number;
  q: number;
  vr: 1 | 0;
}

export type Items = ReadonlyArray<Item>;
