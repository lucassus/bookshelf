import { getConnection } from "typeorm";

import { createTestConnection } from "./database/createConnection";

beforeEach(() => createTestConnection());

afterEach(() => getConnection().close());
