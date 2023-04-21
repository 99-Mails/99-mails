type Fn = (...args: any) => any;

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type Timestamp = string;
type ID = string;

export enum AccessInterface {
  WEB,
  TELEGRAM,
  VIBER,
  API,
  APP,
}

export enum DecodeStatus {
  OK,
  ERROR_DECODING,
}

export enum TextSource {
  TEXT,
  HTML,
}
