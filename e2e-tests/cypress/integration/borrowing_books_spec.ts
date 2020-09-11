it("handles borrowing and returning books", () => {
  cy.login();
  cy.visit("/");

  // TODO: Flaky test, sometimes it displays old data
  cy.findByText("Blood of Elves").click();
  cy.findByText("borrow").click();
  cy.findByText("return").click();
});
