describe("My books page", () => {
  it("allows to borrow and return book copies", () => {
    cy.login();
    cy.visit("/");

    cy.openUserMenu().within(() => {
      cy.findByText("Books").click();
    });

    cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
      cy.findByText("Borrowed book copies (1)").should("exist");
    });

    cy.findByText("Users").click();
    cy.findByText("Dan").click();

    cy.findBookCopies("Children of Dune")
      .first()
      .within(() => {
        cy.findUserAvatar("Dan").should("exist");
        cy.findUserAvatar("Bod").should("not.exist");

        cy.findByText("borrow").should("exist").click();
        cy.findUserAvatar("Bob").should("exist");
      });

    cy.openUserMenu().within(() => {
      cy.findByText("Books").click();
    });

    cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");

      cy.findBookCopies("Children of Dune")
        .first()
        .should("exist")
        .within(() => {
          cy.findUserAvatar("Bob").should("exist");
          cy.findByText("return").click();
          cy.findUserAvatar("Bob").should("not.exist");
        });

      cy.findByText("Borrowed book copies (1)").should("exist");
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
        cy.findUserAvatar("Bob").should("not.exist");
        cy.findByText("borrow").click();
        cy.findUserAvatar("Bob").should("exist");
      });

    cy.openUserMenu().within(() => {
      cy.findByText("Books").click();
    });

    cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
      cy.findByText("Borrowed book copies (2)").should("exist");

      cy.findBookCopies("Dune Messiah")
        .first()
        .within(() => {
          cy.findByText("return").should("exist");
        });
    });
  });
});
