it("handles the navigation", () => {
  cy.visit("/");

  cy.get("nav").findByText("Personal Library");
  cy.findByText("Baptism of fire").should("exist");

  cy.findByText("next").click();
  cy.findByText("next").click();
  cy.findByText("The Lady of the Lake").should("exist");

  cy.findByText("first").click();
  cy.findByText("Blood of Elves").click();
  cy.contains("Written by Andrzej Sapkowski");
  cy.contains(
    "For more than a hundred years, humans, dwarves, gnomes and elves lived together in relative peace."
  );

  cy.findByText("Andrzej Sapkowski").click();
  cy.contains("Andrzej Sapkowski, born June 21, 1948 in Łódź");

  cy.get("nav").findByText("Authors").click();
  cy.location("pathname").should("equal", "/authors");

  cy.findByText("J. K. Rowling").should("exist");
  cy.findByText("James S. A. Corey").should("exist");
  cy.findByText("Andrzej Sapkowski").should("exist");

  cy.get("nav").findByText("Users").click();
  cy.location("pathname").should("equal", "/users");

  cy.findByText("Alice").should("exist");
  cy.findByText("Bob").should("exist");
  cy.findByText("Celine").should("exist");
  cy.findByText("Dan").should("exist");

  cy.findByText("Alice").click();
  cy.findByText(
    "Food scholar. Incurable tv fanatic. Reader. Typical zombie buff. Gamer. Lifelong creator. Certified organizer."
  ).should("exist");

  cy.visit("/my/profile");
  cy.findByText("Page not found!").should("exist");

  cy.visit("/my/books");
  cy.findByText("Page not found!").should("exist");

  cy.visit("/login");
  cy.get("form").within(() => {
    cy.findByText("Login").should("exist");
  });

  cy.login();
  cy.reload();
  cy.findByText("Page not found!").should("not.exist");

  cy.visit("/login");
  cy.findByText("Page not found!").should("exist");
});
