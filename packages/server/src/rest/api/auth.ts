import express from "express";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { user } = req as any;

  if (!user) {
    return res.sendStatus(401);
  }

  return res.json(user);
});

export { router as auth };
