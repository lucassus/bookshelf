describe("/api/users", () => {
  beforeEach(() => {
    cy.login();
    cy.request("/api/users").as("users");
  });

  it("responds with success", () => {
    cy.get("@users").its("status").should("equal", 200);
  });
});
