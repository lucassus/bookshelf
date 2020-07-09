import React from "react";

import styles from "./UserAvatar.module.scss";
import { UserAvatarFieldsFragment } from "./UserAvatarFields.generated";

type Props = {
  user: UserAvatarFieldsFragment;
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
