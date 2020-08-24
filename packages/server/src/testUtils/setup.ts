import faker from "faker";
import { Container } from "typedi";
import { createConnection, useContainer, Connection } from "typeorm";

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
