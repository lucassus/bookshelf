import React from "react";

import { User } from "../../types.generated";
import styles from "./UserAvatar.module.scss";

type Props = {
  user: User;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => (
  <figure className={styles.container}>
    <img src={user.avatar.image.url} alt={user.name} />

    <figcaption>{user.name}</figcaption>
  </figure>
);
