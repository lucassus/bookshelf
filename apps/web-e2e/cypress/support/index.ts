import "@testing-library/cypress/add-commands";

import "./authentication";
import "./books";
import "./commands";
import "./seed";

beforeEach(() => {
  cy.seed();
});
