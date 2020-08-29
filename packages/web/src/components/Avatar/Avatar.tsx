import React from "react";

import { AvatarFragment } from "./Avatar.fragment.generated";
import styles from "./Avatar.module.scss";

type AvatarSize = "small" | "medium";

type Props = {
  label: string;
  size?: AvatarSize;
  avatar: AvatarFragment;
};

const AVATAR_SIZES: Record<AvatarSize, string> = {
  small: "50px",
  medium: "160px"
};

export const Avatar: React.FunctionComponent<Props> = ({
  label,
  size = "medium",
  avatar
}) => {
  const src =
    avatar.__typename === "FlaggedAvatarError"
      ? "https://res.cloudinary.com/lucassus/image/upload/v1598608061/bookshelf/users/avatar-placeholder.png"
      : avatar.image.url;

  const backgroundColor =
    avatar.__typename === "FlaggedAvatarError" ? "red" : avatar.color;

  return (
    <img
      className={styles.container}
      src={src}
      alt={label}
      style={{
        backgroundColor,
        height: AVATAR_SIZES[size]
      }}
    />
  );
};
