import React from "react";

import { Avatar } from "../Avatar";
import { UserCardFragment } from "./UserCard.fragment.generated";
import styles from "./UserCard.module.scss";

type Props = {
  user: UserCardFragment;
};

export const UserCard: React.FunctionComponent<Props> = ({
  user: { name, avatar }
}) => (
  <figure className={styles.container}>
    <Avatar name={name} avatar={avatar} />
    <figcaption>{name}</figcaption>
  </figure>
);
