Cypress.Commands.add("seed", () => {
  const log = Cypress.log({
    name: "seed",
    autoEnd: false
  });

  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then(() => log.end());
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      seed: () => any;
    }
  }
}
