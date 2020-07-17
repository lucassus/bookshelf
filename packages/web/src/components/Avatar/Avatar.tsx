import React from "react";

import { AvatarFragment } from "./Avatar.fragment.generated";
import styles from "./Avatar.module.scss";

type Props = {
  name: string;
  avatar: AvatarFragment;
};

export const Avatar: React.FunctionComponent<Props> = ({ name, avatar }) => (
  <img
    className={styles.container}
    src={avatar.image.url}
    alt={name}
    style={{ backgroundColor: avatar.color }}
  />
);
