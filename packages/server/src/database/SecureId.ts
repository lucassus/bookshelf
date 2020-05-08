interface SecureIdOptions {
  separator: string;
}

// TODO: Extract it to the separate library
export class SecureId {
  static encode = (value: string) => Buffer.from(value).toString("base64");

  static decode = (encoded: string) =>
    Buffer.from(encoded, "base64").toString();

  constructor(private options: SecureIdOptions = { separator: "-" }) {}

  toExternal(id: number | string, type?: string) {
    return SecureId.encode(
      [id, type].filter(Boolean).join(this.options.separator)
    );
  }

  toInternal(value: string) {
    return this.toInternalAndType(value)[0];
  }

  toInternalAndType(encodedId: string) {
    return SecureId.decode(encodedId).split(this.options.separator, 2);
  }
}
