export class Collection<T> {
  constructor(private documents: T[]) {}

  find(query: Partial<T> = {}): Promise<T[]> {
    const byQuery = (document: T) =>
      Object.entries(query).reduce((matches, [field, value]) => {
        return matches && document[field] === value;
      }, true);

    return Promise.resolve(this.documents.filter(byQuery));
  }

  findOne(query: Partial<T>): Promise<T> {
    return this.find(query).then((documents) => {
      if (documents.length > 0) {
        return documents[0];
      }

      throw new Error("Document not found!");
    });
  }

  findRandom() {
    const randomIndex = Math.floor(Math.random() * this.documents.length);
    return Promise.resolve(this.documents[randomIndex]);
  }
}
