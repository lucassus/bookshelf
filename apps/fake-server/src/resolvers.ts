import { faker } from "@faker-js/faker";

export const resolvers = {
  Timestampable: {
    createdAt: () =>
      faker.date
        .between({
          from: new Date(2018, 0, 1),
          to: new Date()
        })
        .toISOString(),
    updatedAt: () =>
      faker.date
        .between({
          from: new Date(2018, 0, 1),
          to: new Date()
        })
        .toISOString()
  },

  Person: {
    name: () => faker.person.fullName(),
    email: () => faker.internet.email(),
    info: () => faker.lorem.paragraph()
  }
};
