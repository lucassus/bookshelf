import { toInternalId, toExternalId, toInternalIdAndType } from "./helpers";

describe(".toExternalID", () => {
  it("returns an external ID", () => {
    expect(toExternalId(1, "Book")).toEqual("MS1Cb29r");
    expect(toExternalId(2, "Author")).toEqual("Mi1BdXRob3I=");
    expect(toExternalId(3)).toEqual("Mw==");
  });
});

describe(".toInternalIdAndType", () => {
  it("converts an external ID to internal ID", () => {
    expect(toInternalIdAndType("MS1Cb29r")).toEqual(["1", "Book"]);
    expect(toInternalIdAndType("Mi1BdXRob3I=")).toEqual(["2", "Author"]);
    expect(toInternalIdAndType("Mw==")).toEqual(["3"]);
  });
});

describe(".toInternalId", () => {
  it("converts an external ID to internal ID", () => {
    expect(toInternalId("MS1Cb29r")).toEqual("1");
    expect(toInternalId("Mi1BdXRob3I=")).toEqual("2");
    expect(toInternalId("Mw==")).toEqual("3");
  });
});
