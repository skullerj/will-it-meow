import { SetupServer } from "msw/node";
declare module "vitest" {
  export interface TestContext {
    server: SetupServer;
  }
}
