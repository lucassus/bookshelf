import { createComponentRenderer } from "../../testUtils/createComponentRenderer";
import { createUser } from "../../testUtils/factories";
import { UserCard } from "./UserCard";

describe("<UserCard />", () => {
  const user = createUser({
    name: "Bob"
  });

  const renderComponent = createComponentRenderer(UserCard, {
    user
  });

  it("renders and matches the snapshot", () => {
    const { getByText, rerender } = renderComponent();
    expect(getByText("Bob")).toBeInTheDocument();

    rerender({ user: { ...user, name: "John" } });
    expect(getByText("John")).toBeInTheDocument();
  });
});
