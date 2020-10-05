describe("My books page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");

    cy.openUserMenu().within(() => {
      cy.findByText("Books").click();
    });

    cy.location("pathname").should("equal", "/my/books");
  });

  it("displays the list of owned book copies", () => {
    cy.findByTestId("owned-book-copies-list").within(() => {
      cy.findByText("Owned book copies (2)").should("exist");

      cy.findBookCopies("Blood of Elves")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Bob")
            .should("exist");
          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Alice")
            .should("exist");
        });

      cy.findBookCopies("The Lady of the Lake")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Bob")
            .should("exist");
          cy.findByTestId("book-copy-borrower").should("not.exist");
        });
    });
  });

  it("displays the list of borrowed book copies", () => {
    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");

      cy.findBookCopies("The Tower of the Swallow")
        .first()
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Alice")
            .should("exist");
          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Bob")
            .should("exist");
        });

      cy.findBookCopies("Dune")
        .first()
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Dan")
            .should("exist");
          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Bob")
            .should("exist");
        });
    });
  });

  it("allows to return a book copy", () => {
    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");

      cy.findBookCopies("The Tower of the Swallow")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findByTestId("book-copy-owner")
            .findUserAvatar("Alice")
            .should("exist");

          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Bob")
            .should("exist");

          cy.findByText("return").click();
        });

      cy.findByText("Borrowed book copies (1)").should("exist");

      cy.findBookCopies("The Tower of the Swallow").should("have.length", 0);
      cy.findBookCopies("Dune").should("have.length", 1);
    });
  });

  // TODO: Refactor this scenario...
  it("allows to borrow a book copy", () => {
    cy.findByText("Users").click();
    cy.findByText("Dan").click();

    cy.findBookCopies("Children of Dune")
      .first()
      .within(() => {
        cy.findByTestId("book-copy-owner")
          .findUserAvatar("Dan")
          .should("exist");
        cy.findByTestId("book-copy-borrower").should("not.exist");

        cy.findByText("borrow").should("exist").click();
        cy.findByTestId("book-copy-borrower")
          .findUserAvatar("Bob")
          .should("exist");
      });

    cy.openUserMenu().within(() => {
      cy.findByText("Books").click();
    });

    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (3)").should("exist");

      cy.findBookCopies("Children of Dune")
        .first()
        .should("exist")
        .within(() => {
          cy.findByTestId("book-copy-borrower")
            .findUserAvatar("Bob")
            .should("exist");
          cy.findByText("return").click();
        });

      cy.findByText("Borrowed book copies (2)").should("exist");
      cy.findBookCopies("Children of Dune").should("have.length", 0);
    });

    cy.findByText("Users").click();
    cy.findByText("Dan").click();

    cy.findBookCopies("Children of Dune")
      .first()
      .within(() => {
        cy.findByText("borrow").should("exist");
        cy.findByText("return").should("not.exist");
      });

    cy.findBookCopies("Dune Messiah")
      .first()
      .within(() => {
        cy.findByTestId("book-copy-borrower").should("not.exist");
        cy.findByText("borrow").click();
        cy.findByTestId("book-copy-borrower")
          .findUserAvatar("Bob")
          .should("exist");
      });
  });

  it("is accessible only for logged in users", () => {
    cy.openUserMenu().within(() => {
      cy.findByText("Log Out").click();
    });

    cy.visit("/my/books");
    cy.findByText("Page not found!").should("exist");
  });
});
