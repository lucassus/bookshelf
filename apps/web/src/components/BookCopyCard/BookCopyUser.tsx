import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "../Avatar";
import { BookCopyUserFragment } from "./BookCopyUserFragment.generated";

type Props = {
  user: BookCopyUserFragment;
};

export const BookCopyUser: React.FunctionComponent<Props> = ({ user }) => (
  <Link to={`/users/${user.id}`}>
    <Avatar label={user.name} size="small" avatar={user.avatar} />
  </Link>
);
