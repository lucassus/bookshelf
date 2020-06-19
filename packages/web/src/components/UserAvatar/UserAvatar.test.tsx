import { createComponentRenderer } from "../../testUtils/createComponentRenderer";
import { createUser } from "../../testUtils/factories";
import { UserAvatar } from "./UserAvatar";

describe("<UserAvatar />", () => {
  const user = createUser({
    name: "Bob"
  });

  const renderComponent = createComponentRenderer(UserAvatar, {
    user
  });

  it("renders and matches the snapshot", () => {
    const { getByText, rerender } = renderComponent();
    expect(getByText("Bob")).toBeInTheDocument();

    rerender({ user: { ...user, name: "John" } });
    expect(getByText("John")).toBeInTheDocument();
  });
});
