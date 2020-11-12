describe("/api/books", () => {
  beforeEach(() => {
    cy.request("/api/books").as("books");
  });

  it("responds with success", () => {
    cy.get("@books").its("status").should("equal", 200);
  });

  it("responds with list of books", () => {
    cy.get("@books")
      .its("body")
      .should((books) => {
        expect(books).to.have.length(10);
        books.forEach((book: any) => {
          expect(book).to.have.all.keys("id", "title", "description", "author");
        });

        const firstBook = books[0];
        expect(firstBook).to.have.property("id");
        expect(firstBook).to.have.property("title", "Abaddon's Gate");
        expect(firstBook).to.have.nested.property("author.id");
        expect(firstBook).to.have.nested.property(
          "author.name",
          "James S. A. Corey"
        );
      });
  });
});
