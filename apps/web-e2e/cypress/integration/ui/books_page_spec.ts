describe("Books page", () => {
  it("displays list of books", () => {
    cy.visit("/");

    cy.findBookCard("Abaddon's Gate").should("exist");
    cy.findBookCard("Dune").should("exist");
    cy.findBookCard("Children of Dune").should("exist");

    cy.findFavouriteBookButton().should("not.exist");
  });

  it("allows to add and remove a book from favourites when a user is logged in", () => {
    cy.login();
    cy.visit("/");

    cy.findBookCard("Dune").within(() => {
      cy.findByLabelText("Remove from favourites").should("exist");
    });

    cy.findBookCard("Children of Dune").within(() => {
      cy.findFavouriteBookButton()
        .should("have.attr", "aria-label", "Remove from favourites")
        .click()
        .should("have.attr", "aria-label", "Add to favourites");
    });

    cy.findBookCard("Baptism of fire").within(() => {
      cy.findFavouriteBookButton()
        .should("have.attr", "aria-label", "Add to favourites")
        .click()
        .should("have.attr", "aria-label", "Remove from favourites");
    });

    cy.reload();

    cy.findBookCard("Children of Dune").within(() => {
      cy.findFavouriteBookButton().should(
        "have.attr",
        "aria-label",
        "Add to favourites"
      );
    });

    cy.findBookCard("Baptism of fire").within(() => {
      cy.findFavouriteBookButton().should(
        "have.attr",
        "aria-label",
        "Remove from favourites"
      );
    });
  });
});
