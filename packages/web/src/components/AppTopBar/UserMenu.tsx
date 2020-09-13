import React, { MouseEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { CurrentUserFragment } from "../AuthContext/CurrentUser.fragment.generated";
import { Avatar } from "../Avatar";
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
  const { unauthorize } = useAuth();

  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, onClose);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (
      event.target instanceof HTMLElement &&
      ["A", "BUTTON"].includes(event.target.tagName)
    ) {
      onClose();
    }
  };

  const handleLogoutClick = () => unauthorize();

  return createPortal(
    <section
      onClick={handleClick}
      className={styles.container}
      ref={ref}
      data-cy="user-menu"
    >
      <header>
        <div>Account</div>
        <button onClick={onClose}>
          <FaTimes />
        </button>
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
              <Link to="/my/profile">Profile</Link>
            </li>

            <li>
              <Link to="#">Books</Link>
            </li>

            <hr />

            <li>
              <button onClick={handleLogoutClick}>Log Out</button>
            </li>
          </ul>
        </nav>
      </div>
    </section>,
    document.getElementById("bookshelf-portal")!
  );
};
