describe("Resources page", () => {
  it("displays list of all resources", () => {
    cy.login({ as: "admin" });
    cy.visit("/");

    cy.get("nav").findByText("Resources").click();

    cy.findByText("Frank Herbert").should("exist");
    cy.findByText("Dune").should("exist");
  });

  it("is accessible only for logged in admin users", () => {
    cy.visit("/resources");
    cy.findByText("Page not found!").should("exist");

    cy.login();
    cy.visit("/resources");
    cy.findByText("Page not found!").should("exist");
  });
});
