import React from "react";

import { AvatarFragment } from "./Avatar.fragment.generated";
import styles from "./Avatar.module.scss";

type Props = {
  name: string;
  small?: boolean;
  avatar: AvatarFragment;
};

// TODO: Use cloudinary integration
// TODO: Big avatar on user details page
export const Avatar: React.FunctionComponent<Props> = ({
  name,
  small = false,
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
      alt={name}
      style={{
        backgroundColor,
        height: small ? "50px" : "160px"
      }}
    />
  );
};
