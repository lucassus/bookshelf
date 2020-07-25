import { createUser } from "./createUser";

test(".createUser", async () => {
  let user = await createUser();
  expect(user.name).toBe("Rosalind Effertz");
  expect(user.email).toBe("Braulio_Rempel33@hotmail.com");

  user = await createUser({ name: "Bob" });
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("Jaleel20@gmail.com");

  user = await createUser({ name: "Bob", email: "john@email.com" });
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("john@email.com");
});
