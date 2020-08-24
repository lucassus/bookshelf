it("displays list of books", () => {
  cy.visit("/");

  cy.contains("Personal Library");
  cy.contains("Baptism of fire");

  cy.contains("Blood of Elves").click();
  cy.contains("Written by Andrzej Sapkowski");
  cy.contains(
    "For more than a hundred years, humans, dwarves, gnomes and elves lived together in relative peace."
  );
});
