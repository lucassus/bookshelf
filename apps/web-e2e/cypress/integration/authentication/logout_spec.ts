it("allows to log out", () => {
  cy.login();
  cy.visit("/");

  cy.openUserMenu();
  cy.findByTestId("user-menu").within(() => {
    cy.findByText("Log Out").click();
  });

  cy.location("pathname").should("equal", "/");

  cy.get("nav").findUserAvatar("Bob").should("not.exist");
  cy.get("nav").findByText("Login").should("exist");
});
