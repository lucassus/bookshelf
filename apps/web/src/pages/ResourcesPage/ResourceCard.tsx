import React from "react";
import { Link } from "react-router-dom";

import { ResourceCardFragment } from "./ResourceCard.fragment.generated";
import styles from "./ResourceCard.module.scss";
import { ResourceImage } from "./ResourceImage";

const linkToResource = (resource: ResourceCardFragment) => {
  switch (resource.__typename) {
    case "PublicUser":
    case "ProtectedUser":
      return `/users/${resource.id}`;

    case "Author":
      return `/authors/${resource.id}`;

    case "Book":
      return `/books/${resource.id}`;

    default:
      return "/";
  }
};

type Props = {
  resource: ResourceCardFragment;
};

export const ResourceCard: React.FunctionComponent<Props> = ({ resource }) => {
  if (resource.__typename === "Review") {
    return null;
  }

  return (
    <div className={styles.container}>
      <div>
        {resource.__typename === "PublicUser" ||
          (resource.__typename === "ProtectedUser" &&
            resource.avatar.__typename === "Avatar" && (
              <ResourceImage image={resource.avatar.image} />
            ))}

        {(resource.__typename === "Author" || resource.__typename === "Book") &&
          resource.image.__typename === "Image" && (
            <ResourceImage image={resource.image} />
          )}
      </div>

      <dl key={resource.id}>
        <dt>Id</dt>
        <dd>
          <Link to={linkToResource(resource)}>{resource.id}</Link>
        </dd>

        <dt>Name</dt>
        <dd>{resource.name}</dd>

        <dt>Description</dt>
        <dd>{resource.description}</dd>
      </dl>
    </div>
  );
};
