import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { CurrentUserFragment } from "../CurrentUserProvider/CurrentUser.fragment.generated";
import { LogoutButton } from "../LogoutButton";
import { useClickAway } from "./useClickAway";
import styles from "./UserMenu.module.scss";

type Props = {
  onClose: () => void;
  currentUser: CurrentUserFragment;
};

export const UserMenu: React.FunctionComponent<Props> = ({
  onClose,
  currentUser
}) => {
  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, onClose);

  return createPortal(
    <section className={styles.container} ref={ref} data-testid="user-menu">
      <header>
        {currentUser.isAdmin ? <div>Admin Account</div> : <div>Account</div>}
        <Button onClick={onClose}>
          <FaTimes />
        </Button>
      </header>
      <div>
        <nav>
          <ul>
            <hr />

            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                <Avatar
                  size="small"
                  label={currentUser.name}
                  avatar={currentUser.avatar}
                />
              </div>

              <div>
                <div className={styles.userName}>{currentUser.name}</div>
                <span className={styles.userEmail}>{currentUser.email}</span>
              </div>
            </div>

            <hr />

            <li>
              <Link to="/my/profile" onClick={onClose}>
                Profile
              </Link>
            </li>

            <li>
              <Link to="/my/books" onClick={onClose}>
                Books
              </Link>
            </li>

            <hr />

            <li>
              <LogoutButton onSuccess={onClose}>Log Out</LogoutButton>
            </li>
          </ul>
        </nav>
      </div>
    </section>,
    document.getElementById("bookshelf-portal")!
  );
};
