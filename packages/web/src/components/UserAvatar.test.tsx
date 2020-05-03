import { createComponentRenderer } from "../testUtils";
import { User } from "../types.generated";
import { UserAvatar } from "./UserAvatar";

const user: User = {
  id: 1,
  name: "Bob",
  email: "bob@rmail.com",
  avatar: {
    color: "blue",
    image: {
      url: "http://images.com/avatar.png"
    }
  }
};

const renderComponent = createComponentRenderer(UserAvatar, {
  user
});

describe("<UserAvatar />", () => {
  it("renders and matches the snapshot", () => {
    const { getByText, rerender } = renderComponent();
    expect(getByText("Bob")).toBeInTheDocument();

    rerender({ user: { ...user, name: "John" } });
    expect(getByText("John")).toBeInTheDocument();
  });
});
