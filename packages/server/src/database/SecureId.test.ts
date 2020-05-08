import { SecureId } from "./SecureId";

describe("SecureId", () => {
  it("can accept different separator", () => {
    const secureId = new SecureId({ separator: "/" });

    expect(secureId.toExternal(1, "Book")).toEqual("MS9Cb29r");
    expect(secureId.toInternalAndType("MS9Cb29r")).toEqual(["1", "Book"]);
  });

  describe(".toExternal", () => {
    const secureId = new SecureId<"Author" | "Book" | "User">();

    it("returns a string", () => {
      expect(secureId.toExternal(123)).toEqual(expect.any(String));
    });

    it("returns encoded id", () => {
      expect(secureId.toExternal(123)).toEqual("MTIz");
    });

    it("can accept a string", () => {
      expect(secureId.toExternal("123")).toEqual("MTIz");
    });

    it("can encode it with type", () => {
      expect(secureId.toExternal(1, "Author")).toEqual("MS1BdXRob3I=");
      expect(secureId.toExternal(1, "Book")).toEqual("MS1Cb29r");
      expect(secureId.toExternal(1, "User")).toEqual("MS1Vc2Vy");
    });
  });

  describe(".toInternal", () => {
    const secureId = new SecureId();

    it("decodes external id", () => {
      expect(secureId.toInternal("MTIz")).toEqual("123");
      expect(secureId.toInternal("MS1Cb29r")).toEqual("1");
    });
  });

  describe(".toInternalAndType", () => {
    const secureId = new SecureId();

    it("decodes external id ad type", () => {
      expect(secureId.toInternalAndType("MTIz")).toEqual(["123"]);
      expect(secureId.toInternalAndType("MS1Cb29r")).toEqual(["1", "Book"]);
    });
  });
});
