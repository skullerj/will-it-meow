import { rest } from "msw";

export default rest.post(/predictions/, async (_req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ error: "Something went wrong while processing your request" })
  );
});
