it("handles borrowing and returning books", () => {
  cy.login();
  cy.visit("/");

  cy.findByText("Blood of Elves").click();
  cy.findByText("borrow").click();
});
