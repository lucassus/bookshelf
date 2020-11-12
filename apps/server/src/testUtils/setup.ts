import faker from "faker";
import { Container } from "typedi";
import { useContainer, Connection } from "typeorm";

import { createConnection } from "../infra/database/createConnection";

useContainer(Container);

beforeEach(() => {
  faker.seed(42);
  faker.locale = "en";
});

let connection: Connection;

beforeEach(async () => {
  Container.reset();

  connection = await createConnection();
  Container.set(Connection, connection);
});

afterEach(() => connection?.close());
