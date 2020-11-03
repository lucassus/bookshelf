import React, { useState } from "react";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { CurrentUserFragment } from "../CurrentUserProvider/CurrentUser.fragment.generated";
import { UserMenu } from "./UserMenu";
import styles from "./UserMenuButton.module.scss";

type Props = {
  currentUser: CurrentUserFragment;
};

export const UserMenuButton: React.FunctionComponent<Props> = ({
  currentUser
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <li className={styles.container}>
      <Button onClick={handleClick}>
        <Avatar
          size="x-small"
          label={currentUser.name}
          avatar={currentUser.avatar}
        />
      </Button>

      {isOpen && <UserMenu onClose={handleClose} currentUser={currentUser} />}
    </li>
  );
};
