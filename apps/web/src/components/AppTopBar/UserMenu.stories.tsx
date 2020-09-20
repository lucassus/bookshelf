import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { MemoryRouter } from "react-router";

import { CurrentUserFragment } from "../AuthContext/CurrentUser.fragment.generated";
import { UserMenu } from "./UserMenu";

export default {
  title: "USerMenu",
  component: UserMenu,
  decorators: [withKnobs]
};

export const Basic = () => {
  const currentUser: CurrentUserFragment = {
    __typename: "ClassifiedUser",
    id: 1,
    name: text("User name", "Łukasz Bandzarewicz"),
    email: text("User email", "lucassus@gmail.com"),
    info: "Foo bar baz",
    isAdmin: false,
    avatar: {
      __typename: "Avatar",
      image: {
        url:
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/m10.png"
      },
      color: "yellow"
    }
  };

  return (
    <MemoryRouter>
      <UserMenu onClose={() => {}} currentUser={currentUser} />
    </MemoryRouter>
  );
};
