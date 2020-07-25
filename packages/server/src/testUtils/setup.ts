import faker from "faker";
import { getConnection } from "typeorm";

import { createTestConnection } from "../database/createConnection";

beforeEach(() => {
  faker.seed(666);
  faker.locale = "en";
});

beforeEach(() => createTestConnection());

afterEach(() => getConnection().close());
