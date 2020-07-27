import { render } from "@testing-library/react";
import React from "react";

import { createUser } from "../../testUtils/factories";
import { UserCard } from "./UserCard";

describe("<UserCard />", () => {
  const user = createUser({
    name: "Bob"
  });

  it("renders and matches the snapshot", () => {
    const { getByText, rerender } = render(<UserCard user={user} />);
    expect(getByText("Bob")).toBeInTheDocument();

    rerender(<UserCard user={{ ...user, name: "John" }} />);
    expect(getByText("John")).toBeInTheDocument();
  });
});
