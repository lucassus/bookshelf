import { Image, Transformation } from "cloudinary-react";
import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../Card";
import { AuthorCardFragment } from "./AuthorCard.fragment.generated";
import styles from "./AuthorCard.scss";

type Props = {
  author: AuthorCardFragment;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => (
  <Card className={styles.container}>
    {author.photo && (
      <Image publicId={author.photo.path} alt={author.name}>
        <Transformation height={300} crop="scale" />
      </Image>
    )}

    <h3>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>
    </h3>
  </Card>
);
