import { faker } from "@faker-js/faker";
import { Container } from "typedi";
import { useContainer, Connection } from "typeorm";

import { createConnection } from "./database/createConnection";

useContainer(Container);

beforeEach(() => {
  faker.seed(42);
});

let connection: Connection;

beforeEach(async () => {
  Container.reset();

  connection = await createConnection();
  Container.set(Connection, connection);
});

afterEach(() => connection?.close());
