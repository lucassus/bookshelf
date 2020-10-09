import React from "react";

import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetResourcesQuery } from "./GetRespurces.query.generated";

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
          <dd>{resource.id}</dd>

          <dt>Name</dt>
          <dd>{resource.name}</dd>

          <dt>Description</dt>
          <dd>{resource.description}</dd>
        </dl>
      ))}
    </div>
  );
};
