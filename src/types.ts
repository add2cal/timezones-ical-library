export type ZoneEntry = [string, number];

export interface ZoneMap {
  [key: string]: ZoneEntry | ZoneMap;
}

export interface ZonesDb {
  db: ZoneMap;
  toplevel: string[];
  details: string[];
}

export type IsoDate = string;
export type IsoTime = string;
