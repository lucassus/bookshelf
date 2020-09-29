it("handles borrowing and returning books", () => {
  cy.login();
  cy.visit("/");

  cy.findByText("Blood of Elves").click();

  cy.findAllByTestId("book-copy:Blood of Elves")
    .eq(1)
    .within(() => {
      cy.findAllByTestId("avatar:Alice").should("exist");
      cy.findAllByTestId("avatar:Bob").should("not.exist");

      cy.findByText("borrow").click();
      cy.findAllByTestId("avatar:Bob").should("exist");
    });
});
