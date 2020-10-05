// TODO: Duplicated test?
it("handles borrowing and returning books", () => {
  cy.login();
  cy.visit("/");

  cy.findByText("Blood of Elves").click();

  cy.findBookCopies("Blood of Elves")
    .eq(1)
    .within(() => {
      cy.findUserAvatar("Alice").should("exist");
      cy.findUserAvatar("Bob").should("not.exist");

      cy.findByText("borrow").click();
      cy.findUserAvatar("Bob").should("exist");
    });
});
