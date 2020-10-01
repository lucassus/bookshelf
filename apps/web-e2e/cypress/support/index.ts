import "@testing-library/cypress/add-commands";

import "./authentication";
import "./commands";
import "./seed";

beforeEach(() => {
  cy.seed();
});
