import React from "react";

import { AvatarFragment } from "./Avatar.fragment.generated";
import styles from "./Avatar.module.scss";

type Props = {
  name: string;
  small?: boolean;
  avatar: AvatarFragment;
};

export const Avatar: React.FunctionComponent<Props> = ({
  name,
  small = false,
  avatar
}) => (
  <img
    className={styles.container}
    src={avatar.image.url}
    alt={name}
    style={{
      backgroundColor: avatar.color,
      height: small ? "50px" : "inherit"
    }}
  />
);
