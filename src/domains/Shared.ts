export type Timestamp = string;
export type ID = string;

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
