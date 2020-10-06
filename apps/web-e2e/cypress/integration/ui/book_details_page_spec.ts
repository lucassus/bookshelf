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
    cy.findBookCopyCards("Dune").should("have.length", 4);

    cy.findBookCopyCards("Dune")
      .eq(0)
      .findBookCopyOwnerAvatar("Alice")
      .should("exist");

    cy.findBookCopyCards("Dune")
      .eq(1)
      .findBookCopyOwnerAvatar("Dan")
      .should("exist");

    cy.findBookCopyCards("Dune")
      .eq(2)
      .findBookCopyOwnerAvatar("Dan")
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

    it("allows to borrow a book", () => {
      cy.findBookCopyCards("Dune")
        .eq(0)
        .findByText("borrow")
        .should("not.exist");

      cy.findBookCopyCards("Dune")
        .eq(2)
        .within(() => {
          cy.findBookCopyOwnerAvatar("Dan").should("exist");
          cy.findByText("borrow").click();
          cy.findBookCopyBorrowerAvatar("Bob").should("exist");

          cy.findByText("borrow").should("not.exist");
          cy.findByText("return").should("exist");
        });
    });

    it("allows to return a book", () => {
      cy.findBookCopyCards("Dune")
        .should("have.length", 4)
        .eq(1)
        .within(() => {
          cy.findBookCopyOwnerAvatar("Dan").should("exist");
          cy.findBookCopyBorrowerAvatar("Bob").should("exist");

          cy.findByText("return").click();
          cy.findBookCopyBorrowerAvatar().should("not.exist");
        });
    });

    it("does not allow to borrow a book copy from myself", () => {
      cy.findBookCopyCards("Dune")
        .eq(3)
        .within(() => {
          cy.findBookCopyOwnerAvatar("Bob").should("exist");
          cy.findByText("borrow").should("not.exist");
        });
    });

    it("does not allow to return book copy borrowed by the other user", () => {
      cy.findBookCopyCards("Dune")
        .eq(0)
        .within(() => {
          cy.findBookCopyOwnerAvatar("Alice").should("exist");
          cy.findBookCopyBorrowerAvatar("Bob").should("not.exist");
          cy.findBookCopyBorrowerAvatar("Celine").should("exist");

          cy.findByText("return").should("not.exist");
        });
    });
  });

  it("displays 404 error page when a book cannot be found", () => {
    cy.visit("/book/asdf");
    cy.findByText("Page not found!").should("exist");
  });
});
