// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    seed: typeof seed;
  }
}

const seed = () => {
  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then((response) => response.body);
};

Cypress.Commands.add("seed", seed);
