const openUserMenu = () =>
  cy
    .get("nav")
    .findByTestId(/^avatar/)
    .should("exist")
    .parent("button")
    .click();

// TODO: Fix typings
const findUserAvatar = (subject, name) => {
  const root = subject ? cy.wrap(subject) : cy.root();
  return root.findByTestId(`avatar:${name}`);
};

// TODO: Fix typings
const findBookCopies = (subject, title) => {
  const root = subject ? cy.wrap(subject) : cy.root();
  return root.findAllByTestId(`book-copy:${title}`);
};

const findUserCard = (subject, name) => {
  const root = subject ? cy.wrap(subject) : cy.root();
  return root.findByTestId(`user-card:${name}`);
};

// TODO: Make it less tedious
// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace Cypress {
//     interface Chainable {
//       seed: typeof seed;
//       login: typeof login;
//       openUserMenu: typeof openUserMenu;
//       findUserAvatar: typeof findUserAvatar;
//       findBookCopies: typeof findBookCopies;
//       findUserCard: typeof findUserCard;
//     }
//   }
// }

// TODO: Colocate it
Cypress.Commands.add("openUserMenu", openUserMenu);

Cypress.Commands.add(
  "findUserAvatar",
  { prevSubject: ["optional", "element"] },
  findUserAvatar
);

Cypress.Commands.add(
  "findBookCopies",
  { prevSubject: ["optional", "element"] },
  findBookCopies
);

Cypress.Commands.add(
  "findUserCard",
  { prevSubject: ["optional", "element"] },
  findUserCard
);
