import React from "react";

import { User } from "../types.generated";
import styles from "./UserAvatar.module.css";

type Props = {
  user: User;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => (
  <figure className={styles.userAvatar}>
    <img src={user.avatar.image.url} alt={user.name} />

    <figcaption>{user.name}</figcaption>
  </figure>
);
