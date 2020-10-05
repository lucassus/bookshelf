describe("Book details page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByText("Dune").click();
    cy.location("pathname").should("match", /\/books\/.+/);
  });

  it("displays book details", () => {
    cy.contains("Written by")
      .should("exist")
      .invoke("text")
      .then((text) => {
        expect(text).to.eq("Written by Frank Herbert");
      });

    cy.contains(
      "Dune is a 1965 science-fiction novel by American author Frank Herbert"
    ).should("exist");
  });

  it("displays book copies", () => {
    cy.findBookCopies("Dune").should("have.length", 3);

    cy.findBookCopies("Dune")
      .eq(0)
      .findByTestId("book-copy-owner")
      .findUserAvatar("Alice")
      .should("exist");

    cy.findBookCopies("Dune")
      .eq(1)
      .findByTestId("book-copy-owner")
      .findUserAvatar("Dan")
      .should("exist");

    cy.findBookCopies("Dune")
      .eq(2)
      .findByTestId("book-copy-owner")
      .findUserAvatar("Dan")
      .should("exist");
  });

  it("does now allow to borrow a book when a user is not logged in", () => {
    cy.findByText("borrow").should("not.exist");
  });

  describe("when a user is logged in", () => {
    beforeEach(() => {
      cy.login();
      cy.reload();
    });

    // TODO: User should not be able to return other user book
    it("allows to borrow a book", () => {
      cy.findBookCopies("Dune").eq(0).findByText("borrow").should("not.exist");

      cy.findBookCopies("Dune")
        .eq(2)
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Dan")
            .should("exist");

          cy.findByText("borrow").click();

          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Dan")
            .should("exist");
          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Bob")
            .should("exist");

          cy.findByText("borrow").should("not.exist");
          cy.findByText("return").should("exist");
        });
    });

    it("allows to return a book", () => {
      cy.findBookCopies("Dune")
        .should("have.length", 3)
        .eq(1)
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Dan")
            .should("exist");
          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Bob")
            .should("exist");

          cy.findByText("return").click();
          cy.findByTestId("book-copy-borrower").should("not.exist");
        });
    });

    it("does not allow to borrow a book copy from myself", () => {
      cy.findBookCopies("Dune")
        .eq(1)
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Bob")
            .should("exist");
          cy.findByText("borrow").should("not.exist");
        });
    });

    it("does not allow to return book copy borrowed by the other user");
  });

  it("displays 404 error page when a book cannot be found", () => {
    cy.visit("/book/asdf");
    cy.findByText("Page not found!").should("exist");
  });
});
