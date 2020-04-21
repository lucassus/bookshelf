import React from "react";

import { Author } from "../types";

type Props = {
  author: Author;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => (
  <>
    <img src={author.photo.url} alt={author.name} />
    <h2>{author.name}</h2>
  </>
);
