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
      cy.findByText("Owned book copies (3)").should("exist");

      cy.findBookCopyCards("Blood of Elves")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findBookCopyOwnerAvatar("Bob").should("exist");
          cy.findBookCopyBorrowerAvatar("Alice").should("exist");
        });

      cy.findBookCopyCards("The Lady of the Lake")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findBookCopyOwnerAvatar("Bob").should("exist");
          cy.findBookCopyBorrowerAvatar().should("not.exist");
        });

      cy.findBookCopyCards("Dune")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findBookCopyOwnerAvatar("Bob").should("exist");
          cy.findBookCopyBorrowerAvatar().should("not.exist");
        });
    });
  });

  it("displays the list of borrowed book copies", () => {
    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");

      cy.findBookCopyCards("The Tower of the Swallow")
        .first()
        .within(() => {
          cy.findBookCopyOwnerAvatar("Alice").should("exist");
          cy.findBookCopyBorrowerAvatar("Bob").should("exist");
        });

      cy.findBookCopyCards("Dune")
        .first()
        .within(() => {
          cy.findBookCopyOwnerAvatar("Dan").should("exist");
          cy.findBookCopyBorrowerAvatar("Bob").should("exist");
        });
    });
  });

  it("allows to return a book copy", () => {
    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");

      cy.findBookCopyCards("The Tower of the Swallow")
        .should("have.length", 1)
        .first()
        .within(() => {
          cy.findBookCopyOwnerAvatar("Alice").should("exist");

          cy.findBookCopyBorrowerAvatar("Bob").should("exist");

          cy.findByText("return").click();
        });

      cy.findByText("Borrowed book copies (1)").should("exist");

      cy.findBookCopyCards("The Tower of the Swallow").should("have.length", 0);
      cy.findBookCopyCards("Dune").should("have.length", 1);
    });
  });

  it("allows to borrow a book copy", () => {
    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");
    });

    cy.findByText("Users").click();
    cy.findByText("Dan").click();

    cy.findBookCopyCards("Children of Dune")
      .first()
      .within(() => {
        cy.findBookCopyOwnerAvatar("Dan").should("exist");
        cy.findBookCopyBorrowerAvatar().should("not.exist");

        cy.findByText("borrow").should("exist").click();
        cy.findBookCopyBorrowerAvatar("Bob").should("exist");
      });

    cy.openUserMenu().within(() => {
      cy.findByText("Books").click();
    });

    cy.findByTestId("borrowed-book-copies-list").within(() => {
      cy.findByText("Borrowed book copies (3)").should("exist");

      cy.findBookCopyCards("Children of Dune")
        .first()
        .should("exist")
        .within(() => {
          cy.findBookCopyBorrowerAvatar("Bob").should("exist");
          cy.findByText("return").click();
        });

      cy.findByText("Borrowed book copies (2)").should("exist");
      cy.findBookCopyCards("Children of Dune").should("have.length", 0);
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
