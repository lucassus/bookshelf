import "@testing-library/cypress/add-commands";

import "./commands";

beforeEach(() => {
  cy.seed();
});
