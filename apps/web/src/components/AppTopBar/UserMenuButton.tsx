import React, { useState } from "react";

import { Avatar } from "../Avatar";
import { CurrentUserFragment } from "../CurrentUserProvider/CurrentUser.fragment.generated";
import { UserMenu } from "./UserMenu";
import styles from "./UserMenuButton.module.scss";

export const UserMenuButton: React.FunctionComponent<{
  currentUser: CurrentUserFragment;
}> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <li className={styles.container}>
      <button onClick={handleClick}>
        <Avatar
          size="x-small"
          label={currentUser.name}
          avatar={currentUser.avatar}
        />
      </button>

      {isOpen && <UserMenu onClose={handleClose} currentUser={currentUser} />}
    </li>
  );
};
