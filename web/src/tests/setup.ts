import { expect, afterEach, beforeEach } from "vitest";
import { setupServer, SetupServer } from "msw/node";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import "../index.css"; // index.css includes tailwind styles needed for the app to work

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);
let server: SetupServer;

beforeAll(() => {
  server = setupServer();
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach((context) => {
  context.server = server;
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach((context) => {
  cleanup();
  context.server.restoreHandlers();
});

afterAll(() => {
  server.close();
});
