Cypress.Commands.add("seed", () => {
  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then((response) => response.body);
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      seed: () => any;
    }
  }
}
