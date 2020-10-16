describe("Books page", () => {
  it("displays list of books", () => {
    cy.visit("/");

    cy.findBookCard("Abaddon's Gate").should("exist");
    cy.findBookCard("Dune").should("exist");
    cy.findBookCard("Children of Dune").should("exist");
  });

  it("allows to add and remove a book from favourites when a user is logged in", () => {
    cy.login();
    cy.visit("/");

    cy.findBookCard("Dune").within(() => {
      cy.findByLabelText("Remove from favourites").should("exist");
    });

    cy.findBookCard("Children of Dune").within(() => {
      cy.findByLabelText("Add to favourites").should("not.exist");
      cy.findByLabelText("Remove from favourites").should("exist").click();
      cy.findByLabelText("Add to favourites").should("exist");
    });

    cy.findBookCard("Baptism of fire").within(() => {
      cy.findByLabelText("Add to favourites").should("exist").click();

      cy.findByLabelText("Add to favourites").should("not.exist");
      cy.findByLabelText("Remove from favourites").should("exist");
    });

    cy.reload();

    cy.findBookCard("Children of Dune").within(() => {
      cy.findByLabelText("Add to favourites").should("exist");
    });

    cy.findBookCard("Baptism of fire").within(() => {
      cy.findByLabelText("Remove from favourites").should("exist");
    });
  });
});
