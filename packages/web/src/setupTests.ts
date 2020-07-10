// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// TODO: Figure out how to use it with storybook
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
