import React from "react";

import { AvatarFragment } from "./Avatar.fragment.generated";
import styles from "./Avatar.module.scss";

type Props = {
  name: string;
  small?: boolean;
  avatar: AvatarFragment;
};

// TODO: Use cloudinary integration
// TODO: Develop with storybook
export const Avatar: React.FunctionComponent<Props> = ({
  name,
  // TODO: Big avatar on user details page
  small = false,
  avatar
}) => {
  // TODO: Dry it
  if (avatar.__typename === "FlaggedAvatarError") {
    return (
      <img
        className={styles.container}
        src="https://res.cloudinary.com/lucassus/image/upload/v1598608061/bookshelf/users/avatar-placeholder.png"
        alt={name}
        style={{
          backgroundColor: "red",
          height: small ? "50px" : "inherit"
        }}
      />
    );
  }

  return (
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
};
