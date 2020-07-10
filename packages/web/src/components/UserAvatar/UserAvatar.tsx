import React from "react";

import { UserAvatarFragment } from "./UserAvatar.fragment.generated";
import styles from "./UserAvatar.module.scss";

type Props = {
  user: UserAvatarFragment;
};

export const UserAvatar: React.FunctionComponent<Props> = ({
  user: { name, avatar }
}) => (
  <figure className={styles.container}>
    <img
      src={avatar.image.url}
      alt={name}
      style={{ backgroundColor: avatar.color }}
    />

    <figcaption>{name}</figcaption>
  </figure>
);
