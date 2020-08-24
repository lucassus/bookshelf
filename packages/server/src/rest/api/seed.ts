import express from "express";
import { getConnection } from "typeorm";

import { loadFixtures } from "../../testUtils/fixtures";

const router = express.Router();

router.post("/", async (req, res) => {
  await getConnection().synchronize(true);
  await loadFixtures();

  res.send(200);
});

export { router as seed };
