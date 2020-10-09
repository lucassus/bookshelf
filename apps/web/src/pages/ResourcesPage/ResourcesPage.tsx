import React from "react";
import { Link } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetResourcesQuery } from "./GetRespurces.query.generated";

const linkToResource = (resource: any) => {
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

export const ResourcesPage: React.FunctionComponent = () => {
  const { loading, data, error } = useGetResourcesQuery();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load resources..." />;
  }

  const { resources } = data;

  return (
    <div>
      {resources.map((resource) => (
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
      ))}
    </div>
  );
};
