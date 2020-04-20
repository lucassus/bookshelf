import React from "react";

import { AuthorInterface } from "../types";

type Props = {
  author: AuthorInterface;
};

export const Author: React.FunctionComponent<Props> = ({ author }) => (
  <>
    <img src={author.photo.url} alt={author.name} />
    <h2>{author.name}</h2>
  </>
);
