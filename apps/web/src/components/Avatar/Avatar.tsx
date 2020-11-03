import { Image, Transformation } from "cloudinary-react";
import React from "react";

import { AvatarFragment } from "./Avatar.fragment.generated";
import styles from "./Avatar.module.scss";

type AvatarSize = "x-small" | "small" | "medium";

type Props = {
  label: string;
  size?: AvatarSize;
  avatar: AvatarFragment;
};

const AVATAR_SIZES: Record<AvatarSize, number> = {
  "x-small": 32,
  small: 50,
  medium: 160
};

export const Avatar: React.FunctionComponent<Props> = ({
  label,
  size = "medium",
  avatar
}) => {
  const path =
    avatar.__typename === "FlaggedAvatarError"
      ? "/bookshelf/users/avatar-placeholder.png"
      : avatar.image.path;

  const backgroundColor =
    avatar.__typename === "FlaggedAvatarError" ? "red" : avatar.color;

  return (
    <Image
      className={styles.container}
      data-testid={`avatar:${label}`}
      publicId={path}
      style={{
        backgroundColor
      }}
      alt={label}
    >
      <Transformation width={AVATAR_SIZES[size]} crop="scale" />
    </Image>
  );
};
