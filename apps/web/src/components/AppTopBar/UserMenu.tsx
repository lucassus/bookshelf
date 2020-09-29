import React, { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { CurrentUserFragment } from "../AuthContext/CurrentUser.fragment.generated";
import { Avatar } from "../Avatar";
import { useLogoutMutation } from "./Logout.mutation.generated";
import { useClickAway } from "./useClickAway";
import styles from "./UserMenu.module.scss";

type Props = {
  onClose: () => void;
  currentUser: CurrentUserFragment;
};

// TODO: Create a separate component for logout button
export const UserMenu: React.FunctionComponent<Props> = ({
  onClose,
  currentUser
}) => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation({
    update: (cache) => cache.reset()
  });

  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, onClose);

  const handleLogoutClick = useCallback(async () => {
    await logout();
    navigate("/");
    onClose();
  }, [logout, navigate, onClose]);

  return createPortal(
    <section className={styles.container} ref={ref} data-cy="user-menu">
      <header>
        {currentUser.isAdmin ? <div>Admin Account</div> : <div>Account</div>}
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
              <button onClick={handleLogoutClick}>Log Out</button>
            </li>
          </ul>
        </nav>
      </div>
    </section>,
    document.getElementById("bookshelf-portal")!
  );
};
