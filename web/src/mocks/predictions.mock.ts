import { rest } from "msw";

export default rest.post(/\/predictions/, (_req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({ label: "cat", confidence: 0.5, error: null })
  );
});
