const SEPARATOR = "-";

const encode = (value: string) => Buffer.from(value).toString("base64");

const decode = (encoded: string) => Buffer.from(encoded, "base64").toString();

export const toExternalId = (id: number, type?: string) =>
  encode([id, type].filter(Boolean).join(SEPARATOR));

export const toInternalIdAndType = (encodedId: string) =>
  decode(encodedId).split(SEPARATOR, 2);

export const toInternalId = (encodedId: string) =>
  toInternalIdAndType(encodedId)[0];
