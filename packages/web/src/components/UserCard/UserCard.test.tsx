import { render } from "@testing-library/react";
import React from "react";

import { UserCard } from "./UserCard";
import { UserCardFragment } from "./UserCard.fragment.generated";

describe("<UserCard />", () => {
  const user: UserCardFragment = {
    name: "Bob",
    avatar: {
      __typename: "Avatar",
      image: {
        url: "https://example.com/avatar.png"
      },
      color: "blue"
    }
  };

  it("renders and matches the snapshot", () => {
    const { getByText, rerender } = render(<UserCard user={user} />);
    expect(getByText("Bob")).toBeInTheDocument();

    rerender(<UserCard user={{ ...user, name: "John" }} />);
    expect(getByText("John")).toBeInTheDocument();
  });
});
