import faker from "faker";
import { createConnection, getConnection } from "typeorm";

beforeEach(() => {
  faker.seed(42);
  faker.locale = "en";
});

beforeEach(() => createConnection());

afterEach(() => getConnection().close());
