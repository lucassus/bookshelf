import { Collection } from "./Collection";

interface Book {
  id: number;
  authorId: number;
  title: string;
}

const books = [
  { id: 1, authorId: 1, title: "Harry Potter and the Sorcerer's Stone" },
  { id: 2, authorId: 2, title: "Leviathan Wakes" },
  { id: 3, authorId: 3, title: "Blood of Elves" },
  { id: 4, authorId: 3, title: "Time of contempt" },
];

const collection = new Collection<Book>(books);

describe("Collection", () => {
  describe(".find", () => {
    it("resolves with all documents", async () => {
      const documents = await collection.find();
      expect(documents).toHaveLength(4);
    });

    it("resolves with documents that matches the query", async () => {
      const documents = await collection.find({ authorId: 3 });
      expect(documents).toHaveLength(2);
    });

    it("resolves with an empty array when the query does not match any documents", async () => {
      const documents = await collection.find({ authorId: 1000 });
      expect(documents).toHaveLength(0);
    });
  });

  describe(".findOne", () => {
    it("resolves with a document that matches the query", async () => {
      let document = await collection.findOne({ id: 1 });
      expect(document).toEqual(books[0]);

      document = await collection.findOne({ authorId: 3 });
      expect(document).toEqual(books[2]);
    });

    it("rejects with an error when a document cannot be found", () => {
      return collection.findOne({ authorId: 100 }).catch((error) => {
        expect(error.message).toEqual("Document not found!");
      });
    });
  });

  describe(".findRandom", () => {
    it("resolves with a random document", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0.4);
      const document = await collection.findRandom();
      expect(document).toEqual(books[1]);
    });
  });
});
