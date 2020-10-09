import React from "react";
import { Link } from "react-router-dom";

const linkToResource = (resource: { __typename: string; id: string }) => {
  switch (resource.__typename) {
    case "ProtectedUser":
      return `/users/${resource.id}`;

    case "Author":
      return `/authors/${resource.id}`;

    case "Books":
      return `/books/${resource.id}`;

    default:
      return "/";
  }
};

type Props = {
  resource: {
    __typename: string;
    id: string;
    name: string;
    description: string;
  };
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
