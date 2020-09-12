it("handles the navigation", () => {
  cy.visit("/");

  cy.get("nav").findByText("Personal Library");
  cy.findByText("Baptism of fire");

  cy.findByText("next").click();
  cy.findByText("next").click();
  cy.findByText("The lady of the lake");

  cy.findByText("first").click();
  cy.findByText("Blood of Elves").click();
  cy.contains("Written by Andrzej Sapkowski");
  cy.contains(
    "For more than a hundred years, humans, dwarves, gnomes and elves lived together in relative peace."
  );

  cy.findByText("Andrzej Sapkowski").click();
  cy.contains("Andrzej Sapkowski, born June 21, 1948 in Łódź");

  cy.get("nav").findByText("Authors").click();
  cy.findByText("J. K. Rowling");
  cy.findByText("James S. A. Corey");
  cy.findByText("Andrzej Sapkowski");

  cy.get("nav").findByText("Users").click();
  cy.findByText("Alice");
  cy.findByText("Bob");
  cy.findByText("Celine");
  cy.findByText("Dan");

  cy.findByText("Alice").click();
  cy.findByText(
    "Food scholar. Incurable tv fanatic. Reader. Typical zombie buff. Gamer. Lifelong creator. Certified organizer."
  );
});
