import React from "react";

import styles from "./UserAvatar.module.scss";
import { UserAvatarFieldsFragment } from "./UserAvatarFields.generated";

type Props = {
  user: UserAvatarFieldsFragment;
};

// TODO: Show avatar color
export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => (
  <figure className={styles.container}>
    <img src={user.avatar.image.url} alt={user.name} />

    <figcaption>{user.name}</figcaption>
  </figure>
);
