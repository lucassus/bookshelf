import React, { useState } from "react";

import { CurrentUserFragment } from "../AuthContext/CurrentUser.fragment.generated";
import { Avatar } from "../Avatar";
import { UserMenu } from "./UserMenu";
import styles from "./UserMenuButton.module.scss";

export const UserMenuButton: React.FunctionComponent<{
  currentUser: CurrentUserFragment;
}> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={styles.container}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title={`${currentUser.name} (${currentUser.email})`}
      >
        <Avatar
          size="x-small"
          label={currentUser.name}
          avatar={currentUser.avatar}
        />
      </button>

      {isOpen && <UserMenu currentUser={currentUser} />}
    </li>
  );
};
