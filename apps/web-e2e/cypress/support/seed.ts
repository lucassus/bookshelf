const seed = () => {
  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then((response) => response.body);
};

Cypress.Commands.add("seed", seed);
