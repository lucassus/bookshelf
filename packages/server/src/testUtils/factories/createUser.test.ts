import { createUser } from "./createUser";

test(".createUser", async () => {
  let user = await createUser();
  expect(user.name).toBe("Mariana Christiansen");
  expect(user.email).toBe("Neoma.Wiegand@hotmail.com");

  user = await createUser({ name: "Bob" });
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("Reese_Dickinson@hotmail.com");

  user = await createUser({ name: "Bob", email: "john@email.com" });
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("john@email.com");
});
