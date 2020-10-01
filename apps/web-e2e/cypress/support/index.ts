import "@testing-library/cypress/add-commands";

import "./authentication";
import "./commands";
import "./seed";

// TODO: Find a better place
beforeEach(() => {
  cy.seed();
});
