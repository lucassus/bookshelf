it("shows my books page", () => {
  cy.login();
  cy.visit("/");

  cy.findByText("Users").click();
  cy.findByText("Dan").click();

  cy.findBookCopies("Children of Dune")
    .first()
    .within(() => {
      cy.findByText("borrow").should("exist").click();
    });

  cy.openUserMenu().within(() => {
    cy.findByText("Books").click();
  });

  cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
    cy.findBookCopies("Children of Dune")
      .first()
      .within(() => {
        cy.findByText("return").click();
      });
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

  cy.findBookCopies("Children of Dune")
    .first()
    .within(() => {
      cy.findByText("borrow").click();
    });

  cy.findBookCopies("Dune Messiah")
    .first()
    .within(() => {
      cy.findByText("borrow").click();
    });

  cy.openUserMenu().within(() => {
    cy.findByText("Books").click();
  });

  cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
    cy.findBookCopies("Children of Dune")
      .first()
      .within(() => {
        cy.findByText("return").should("exist");
      });

    cy.findBookCopies("Dune Messiah")
      .first()
      .within(() => {
        cy.findByText("return").should("exist");
      });
  });
});
