import express from "express";
import request from "supertest";

import { createBook } from "../../testUtils/factories";
import { routes } from "../index";

test("GET /api/books", async () => {
  // Given
  const app = express();
  app.use("/", routes);

  await createBook({ title: "Dune" });
  await createBook({ title: "Hobbit" });

  // When
  const response = await request(app).get("/api/books");

  // Then
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject([
    {
      id: 1,
      title: "Dune"
    },
    {
      id: 2,
      title: "Hobbit"
    }
  ]);
});
