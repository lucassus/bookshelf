// A dummy collection that mimics mongodb interface
export class Collection<T extends { id: number }> {
  constructor(private documents: T[]) {}

  find(query: Partial<T> = {}): Promise<T[]> {
    const byQuery = (document) =>
      Object.entries(query).reduce((result, [field, value]) => {
        return result && document[field] === value;
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
}
