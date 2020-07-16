import { getConnection } from "typeorm";

import { createTestConnection } from "./database/createConnection";

beforeAll(() => createTestConnection());

afterAll(() => getConnection().close());
