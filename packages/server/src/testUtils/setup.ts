import faker from "faker";
import { createConnection, getConnection } from "typeorm";

beforeEach(() => {
  faker.seed(666);
  faker.locale = "en";
});

beforeEach(() => createConnection());

afterEach(() => getConnection().close());
