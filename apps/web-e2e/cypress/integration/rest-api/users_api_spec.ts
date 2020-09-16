describe("/api/users", () => {
  describe("when authenticated", () => {
    beforeEach(() => {
      cy.login();
      cy.request("/api/users").as("users");
    });

    it("responds with success", () => {
      cy.get("@users").its("status").should("equal", 200);
    });
  });

  describe("when not authenticated", () => {
    beforeEach(() => {
      cy.request({ url: "/api/users", failOnStatusCode: false }).as("users");
    });

    it("responds with error", () => {
      cy.get("@users").its("status").should("equal", 401);
    });
  });
});
