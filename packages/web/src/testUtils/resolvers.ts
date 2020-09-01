import faker from "faker";

export const resolvers = {
  Timestampable: {
    createdAt: () =>
      faker.date.between(new Date(2018, 0, 1), new Date()).toISOString(),
    updatedAt: () =>
      faker.date.between(new Date(2018, 0, 1), new Date()).toISOString()
  },

  Person: {
    name: () => faker.name.findName(),
    email: () => faker.internet.email(),
    info: () => faker.lorem.paragraph()
  }
};
