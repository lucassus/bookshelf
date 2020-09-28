it("shows my books page", () => {
  cy.login();
  cy.visit("/");

  cy.findByText("Users").click();
  cy.findByText("Dan").click();

  cy.get("[data-testid='book-copy:Children of Dune']").within(() => {
    cy.findByText("borrow").should("exist").click();
  });

  cy.get("[data-cy=user-menu-button]").click();
  cy.get("[data-cy=user-menu]").within(() => {
    cy.findByText("Books").click();
  });

  cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
    cy.get("[data-testid='book-copy:Children of Dune']").within(() => {
      cy.findByText("return").click();
    });
    cy.get("[data-testid='book-copy:Children of Dune']").should("not.exist");
  });

  cy.findByText("Users").click();
  cy.findByText("Dan").click();

  cy.get("[data-testid='book-copy:Children of Dune']").within(() => {
    cy.findByText("borrow").should("exist");
    cy.findByText("return").should("not.exist");
  });

  cy.get("[data-testid='book-copy:Dune']").within(() => {
    cy.findByText("borrow").click();
  });

  cy.get("[data-testid='book-copy:Dune Messiah']").within(() => {
    cy.findByText("borrow").click();
  });

  cy.get("[data-cy=user-menu-button]").click();
  cy.get("[data-cy=user-menu]").within(() => {
    cy.findByText("Books").click();
  });

  cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
    cy.get("[data-testid='book-copy:Dune']").within(() => {
      cy.findByText("return").should("exist");
    });

    cy.get("[data-testid='book-copy:Dune Messiah']").within(() => {
      cy.findByText("return").should("exist");
    });
  });
});
