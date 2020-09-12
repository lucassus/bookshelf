import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { CurrentUserFragment } from "../AuthContext/CurrentUser.fragment.generated";
import { Avatar } from "../Avatar";
import styles from "./UserMenu.module.scss";

type Props = {
  currentUser: CurrentUserFragment;
};

// TODO: Find a better name
export const UserMenu: React.FunctionComponent<Props> = ({ currentUser }) => {
  const { unauthorize } = useAuth();

  return (
    <section className={styles.container}>
      <header>
        <div>Account</div>
        <button>
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
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <button onClick={() => unauthorize()}>Log Out</button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
