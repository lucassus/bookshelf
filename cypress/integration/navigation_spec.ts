it("handles navigation", () => {
  cy.visit("/");

  cy.contains("Personal Library");
  cy.contains("Baptism of fire");

  cy.contains("next").click();
  cy.contains("next").click();
  cy.contains("The lady of the lake");

  cy.contains("first").click();
  cy.contains("Blood of Elves").click();
  cy.contains("Written by Andrzej Sapkowski");
  cy.contains(
    "For more than a hundred years, humans, dwarves, gnomes and elves lived together in relative peace."
  );

  cy.contains("Andrzej Sapkowski").click();
  cy.contains("Andrzej Sapkowski, born June 21, 1948 in Łódź");

  cy.contains("Authors").click();
  cy.contains("J. K. Rowling");
  cy.contains("James S. A. Corey");
  cy.contains("Andrzej Sapkowski");

  cy.contains("Users").click();
  cy.contains("Alice");
  cy.contains("Bob");
  cy.contains("Celine");
  cy.contains("Dan");

  cy.contains("Alice").click();
  cy.contains(
    "Food scholar. Incurable tv fanatic. Reader. Typical zombie buff. Gamer. Lifelong creator. Certified organizer."
  );
});
