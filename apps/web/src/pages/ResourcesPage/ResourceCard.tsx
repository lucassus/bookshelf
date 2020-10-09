import React from "react";
import { Link } from "react-router-dom";

import { ResourceCardFragment } from "./ResourceCard.fragment.generated";

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

export const ResourceCard: React.FunctionComponent<Props> = ({ resource }) => (
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
);
