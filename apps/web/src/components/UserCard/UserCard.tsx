import React from "react";

import { Avatar } from "../Avatar";
import { UserCardFragment } from "./UserCard.fragment.generated";
import styles from "./UserCard.module.scss";

type Props = {
  user: UserCardFragment;
};

export const UserCard: React.FunctionComponent<Props> = ({ user }) => (
  <figure className={styles.container}>
    <Avatar label={user.name} avatar={user.avatar} />
    <figcaption>
      {user.name}{" "}
      {user.__typename === "ProtectedUser" && <span>&lt;{user.email}&gt;</span>}
    </figcaption>
  </figure>
);
