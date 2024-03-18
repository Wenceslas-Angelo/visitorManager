import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import authHandlers from "../mock/auth";

const server = setupServer(...authHandlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
